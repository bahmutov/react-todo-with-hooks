/// <reference types="cypress" />

// will be using Webpack Node API
// https://webpack.js.org/api/node/
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const { printWebpackStates } = require('../../utils')

const babelConfig = require('../../babel.config.js')

const runWebpack = (options) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(options)
    compiler.run((err, stats) => {
      printWebpackStates(err, stats)
      if (err) {
        return reject(err)
      }
      resolve(stats)
    })
  })
}

// https://webpack.js.org/configuration/externals/

const fromNodeModules = path.join.bind(path, __dirname, '..', '..', 'node_modules')
const fromDist = path.join.bind(path, path.resolve('./dist/external'))

const externals = {
  react: 'react',
  'react-dom': 'reactDom',
  'cypress-react-unit-test': 'cypressReactUnitTest'
}
// should we just reuse root webpack config?
const webpackVendorOptions = {
  entry: {
    react: fromNodeModules('react'),
    reactDom: fromNodeModules('react-dom'),
    // lodash: fromNodeModules('./node_modules/lodash'),
    cypressReactUnitTest: fromNodeModules('cypress-react-unit-test')
  },
  output: {
    path: path.resolve('./dist/external'),
    filename: 'externals-[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  externals,
  mode: 'production',
  stats: 'verbose',
  // devtool: false,
}

console.log(webpackVendorOptions.entry)
// const compiler = webpack(webpackVendorOptions)

const bundleSpecFile = async (inputFilePath, outputFilePath, sourceMaps = 'inline-source-map') => {
  const webpackSpecOptions = {
    entry: inputFilePath,
    output: {
      path: path.dirname(outputFilePath),
      filename: path.basename(outputFilePath),
    },
    externals,
    mode: 'development',
    stats: 'verbose',
    devtool: sourceMaps,
    // devtool: 'inline-source-map',
    // devtool: 'cheap-source-maps',
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs|ts|tsx)$/,
          loader: 'babel-loader',
          options: babelConfig,
        },
      ],
    },
  }

  // const compiler = webpack(webpackSpecOptions)
  // await compiler.run(printWebpackStates)
  await runWebpack(webpackSpecOptions)
  console.log('finished bundling file', inputFilePath)
  console.log('at', new Date())

  return outputFilePath
}

const bundleVendor = () => {
  console.log('bundling externals')
  return runWebpack(webpackVendorOptions)
}

const bundleSupport = async (config) => {
  console.log('bundling support file %s', config.supportFile)
  const bundledSpecFilename = path.resolve('./support-bundle.js')
  await bundleSpecFile(config.supportFile, bundledSpecFilename, false)
  console.log('finished bundling support to', bundledSpecFilename)


}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  // require('cypress-react-unit-test/plugins/cra-v3')(on, config)

  // key is fileEvent.filePath
  const bundles = {}

  console.log('bundling vendor and support in parallel')
  const started = + new Date()
  await Promise.all([
    bundleVendor(),
    bundleSupport(config)
  ])

  // read generated external bundles into memory
  const cypressReactUnitTest = fs.readFileSync(fromDist('externals-cypressReactUnitTest.js'), 'utf8')
  const react = fs.readFileSync(fromDist('externals-react.js'), 'utf8')
  const reactDom = fs.readFileSync(fromDist('externals-reactDom.js'), 'utf8')
  const vendorSource = react + ';\n' + reactDom + ';\n' + cypressReactUnitTest + ';\n'
  console.log('read external bundles into memory')
  console.log('vendor source length', vendorSource.length)

  const bundledSpecFilename = path.resolve('./support-bundle.js')

  const outputSrc = fs.readFileSync(bundledSpecFilename, 'utf8')
  console.log('file %s length %d', bundledSpecFilename, outputSrc.length)
  const fullSrc = vendorSource + ';\n' + outputSrc
  console.log('full source length %d', fullSrc.length)
  fs.writeFileSync(bundledSpecFilename, fullSrc, 'utf8')
  console.log('written full file', bundledSpecFilename)
  const finished = + new Date()
  console.log('support prep work done in %dms', finished - started)

  bundles[config.supportFile] = Promise.resolve(bundledSpecFilename)

  on('file:preprocessor', (fileEvent) => {
    console.log(new Date())
    console.log('need to bundle file', fileEvent)
    if (bundles[fileEvent.filePath]) {
      console.log('returning existing promise to bundle', fileEvent.filePath)
      return bundles[fileEvent.filePath]
    }

    bundles[fileEvent.filePath] = bundleSpecFile(fileEvent.filePath, fileEvent.outputPath)

    return bundles[fileEvent.filePath]
  })

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
