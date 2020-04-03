import React from "react";
import App from "./App";
import {mount} from 'cypress-react-unit-test'

describe('App', () => {
  beforeEach(() => {
    mount(
      <App />,
      {
        stylesheets: [
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css'
        ]
      }
    )
  })

  it('works', () => {
    cy.get('.todo').should('have.length', 3)
    cy.get('input.input').type('Test with Cypress{enter}')
    cy.get('.todo').should('have.length', 4)
      .contains('Meet friend for lunch')
      .find('[data-cy=remove]').click()


    cy.get('.todo').should('have.length', 3)
  })

  it('toggles an item', () => {
    cy.get('.todo').should('have.length', 3)
      .contains('Learn about React')
      .contains('button', 'Complete').click()
    cy.contains('Learn about React')
      .should('have.css', 'text-decoration',
        'line-through solid rgb(74, 74, 74)')
      .then(() => {
        cy.wrap(window.todos[0]).should('deep.equal', {
          text: 'Learn about React',
          isCompleted: true
        })
      })

    cy.contains('Learn about React')
      .contains('button', 'Redo').click()
      .then(() => {
        cy.wrap(window.todos[0]).should('deep.equal', {
          text: 'Learn about React',
          isCompleted: false
        })
      })
  })
})
