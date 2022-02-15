// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { STORAGE_KEY } from "../../src/constants"

Cypress.Commands.add("login", ({ user, password }) => {
    cy.visit(Cypress.env().slug.index)

    if (user) {
        cy.get("form input[name=user]").type(user)
    }

    if (password) {
        cy.get("form input[name=password]").type(password)
    }

    cy.get("form input[type=submit]").click()
})

Cypress.Commands.add("chat", (message) => {
    cy.get(".Chat form input[name=message]").type(message).type("{enter}")
})

Cypress.Commands.add("flushSession", () => {
    window.sessionStorage.removeItem(STORAGE_KEY)
})
