// works with Cypress built-in browserify bundler
import { add } from './math'
import { ImportMock } from 'ts-mock-imports'
import { compute } from './calc'
// to mock "./math add" export need to import entire module
import * as math from './math'

it('adds', () => {
  // testing the original function
  expect(add(2, 3)).to.equal(5)
})

it('adds mocked here', () => {
  expect(add(2, 3)).to.equal(5) // original import
  ImportMock.mockFunction(math, 'add', 100)
  expect(math.add(2, 3)).to.equal(100) // math.add method is stubbed

  math.add.restore()
  expect(add(29, 3)).to.equal(32) // original import again
})

it('mocks in calc', () => {
  ImportMock.mockFunction(math, 'add', 11)
  expect(compute(2, 3)).to.equal(11)
})
