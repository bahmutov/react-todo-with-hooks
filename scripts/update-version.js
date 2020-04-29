const path = require('path')
const fs = require('fs')

const name = process.argv[2]
if (!name) {
  console.error('Usage: update-version <package name>')
  process.exit(1)
}

const pkgFilename = path.join(process.cwd(), 'package.json')
const pkg = require(pkgFilename)
const allDependencies = Object.assign({}, pkg.dependencies, pkg.devDependencies)
const currentVersion = allDependencies[name]
if (!currentVersion) {
  console.error('Could not find dependency %s among dependencies', name)
  process.exit(1)
}

const readmeFilename = path.join(process.cwd(), 'README.md')
const readmeText = fs.readFileSync(readmeFilename, 'utf8')

// const cypressVersionRe = /https:\/\/img\.shields\.io\/badge\/cypress-(\d+\.\d+\.\d+)-brightgreen/
function escapeName(name) {
  // for shields.io need to change each '-' into '--'
  return name.replace(/-/g, '--')
}

function replaceVersionShield(name, newVersion) {
  const escapedName = escapeName(name)
  const cypressVersionRe = new RegExp('https://img\\.shields\\.io/badge/' + escapedName + '-(\\d+\\.\\d+\\.\\d+)-brightgreen')
  const cypressNewVersion = `https://img.shields.io/badge/${escapedName}-${newVersion}-brightgreen`
  const updatedReadmeText = readmeText.replace(cypressVersionRe, cypressNewVersion)
  return updatedReadmeText
}

// replaceVersionShield('cypress', '4.5.1')
const maybeChangedText = replaceVersionShield(name, currentVersion)
if (maybeChangedText) {
  console.log('saving updated readme with %s@%s', name, currentVersion)
  fs.writeFileSync(readmeFilename, maybeChangedText, 'utf8')
}
