Running "standard" plugins with

```shell
$ DEBUG=cypress:webpack:stats npx cypress run --spec src/Todo.spec.js
```

Support file: 2400ms, spec file 3000ms


```
Hash: 802dc9b4df39f7ff3b3d
Version: webpack 4.43.0
Time: 2391ms
Built at: 05/23/2020 3:28:49 PM
   Asset      Size  Chunks             Chunk Names
index.js  40.2 KiB    main  [emitted]  main
Entrypoint main = index.js
[0] multi ./cypress/support/index.js 28 bytes {main} [built]
[./cypress/support/index.js] 43 bytes {main} [built]
[./node_modules/@cypress/code-coverage/support-utils.js] 2.13 KiB {main} [built]
[./node_modules/@cypress/code-coverage/support.js] 7.6 KiB {main} [built]
[./node_modules/cypress-react-unit-test/dist/hooks.js] 1.26 KiB {main} [built]
[./node_modules/cypress-react-unit-test/support/index.js] 257 bytes {main} [built]
Hash: 20de795d38861070d550
Version: webpack 4.43.0
Time: 3096ms
Built at: 05/23/2020 3:28:49 PM
       Asset      Size  Chunks             Chunk Names
Todo.spec.js  2.69 MiB    main  [emitted]  main
Entrypoint main = Todo.spec.js
[0] multi ./src/Todo.spec.js 28 bytes {main} [built]
[./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js] 86 bytes {main} [built]
[./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js] 579 bytes {main} [built]
[./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js] 210 bytes {main} [built]
[./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js] 397 bytes {main} [built]
[./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js] 492 bytes {main} [built]
[./node_modules/cypress-react-unit-test/dist/getDisplayName.js] 1.67 KiB {main} [built]
[./node_modules/cypress-react-unit-test/dist/index.js] 4.99 KiB {main} [built]
[./node_modules/cypress-react-unit-test/dist/utils.js] 3 KiB {main} [built]
[./node_modules/react-dom/index.js] 1.32 KiB {main} [built]
[./node_modules/react/cjs/react.development.js] 65.5 KiB {main} [built]
[./node_modules/react/index.js] 189 bytes {main} [built]
[./src/App.css] 472 bytes {main} [built]
[./src/App.js] 21.3 KiB {main} [built] [1 warning]
[./src/Todo.spec.js] 12.4 KiB {main} [built]
    + 12 hidden modules
```

Running using [cypress/plugins/externals.js](cypress/plugins/externals.js)

