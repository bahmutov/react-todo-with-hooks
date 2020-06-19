# Single spec headless mode

## Current bundling

Running "standard" plugin with

```shell
$ DEBUG=cypress:webpack:stats npx cypress run --spec src/Todo.spec.js
```

Support file: 1545ms (42 KiB)
spec file: 2057ms (2.67 MiB)

## Using externals

Running using [cypress/plugins/externals.js](cypress/plugins/externals.js)

Externals: 300ms
Support file: 3000ms (51.8 KiB)
Spec file: 190ms (31.1 KiB)


```
bundling externals
*******
2020-06-19T17:37:38.589Z
*******
Hash: 45576efb8aff33a9b9a1
Version: webpack 4.43.0
Time: 304ms
Built at: 06/19/2020 1:37:38 PM
                            Asset      Size  Chunks             Chunk Names
externals-cypressReactUnitTest.js  5.39 KiB       0  [emitted]  cypressReactUnitTest
               externals-react.js  8.41 KiB       1  [emitted]  react
            externals-reactDom.js   121 KiB       2  [emitted]  reactDom
Entrypoint react = externals-react.js
Entrypoint reactDom = externals-reactDom.js
Entrypoint cypressReactUnitTest = externals-cypressReactUnitTest.js
```

Spec file bundle

```
Hash: 38447fc2ae99ed1cf01e
Version: webpack 4.43.0
Time: 190ms
Built at: 06/19/2020 1:40:22 PM
       Asset      Size  Chunks             Chunk Names
Todo.spec.js  31.1 KiB    main  [emitted]  main
Entrypoint main = Todo.spec.js
[./src/App.js] 4.16 KiB {main} [built]
[./src/Todo.spec.js] 2.3 KiB {main} [built]
[cypress-react-unit-test] external "cypressReactUnitTest" 42 bytes {main} [built]
[react] external "react" 42 bytes {main} [built]
```

# Multiple specs headless mode

Filename | Current (ms) | Externals (ms)
--- | --- | ---
Externals | 0 | 400
Support | 3000 | 3000
todo.spec.js | 3000 | 40
App.spec.js | 1400 | 150
Todo.spec.js | 410 | 100
TodoForm.spec.js | 850 | 120

# Interactive mode

Bundling externals means every spec is fast, taking 40-150ms to load, while the current bundling has a noticeable delay.
