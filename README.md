# react-todo-with-hooks

Example application copied from [codesandbox](https://codesandbox.io/s/oj3qm2zq06) from blog post [How To Build a React To-Do App with React Hooks](https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks).

End-to-end and component tests using [Cypress](http://github.com/cypress-io/cypress) and [cypress-react-unit-test](https://github.com/bahmutov/cypress-react-unit-test)

Test | Description
--- | ---
[cypress/integration/todo.spec.js](cypress/integration/todo.spec.js) | End-to-end test against application running at `localhost:3000`
[src/Todo.spec.js](src/Todo.spec.js) | Component test for `Todo` exported from `src/App.js`
[src/App.spec.js](src/App.spec.js) | Component test for `App` and unit test for `toggleOneTodo` exported from `src/App.js`

Tests capture code coverage, see created folder `coverage`
