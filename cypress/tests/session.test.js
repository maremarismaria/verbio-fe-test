import { SERVER_TYPING_INTERVAL } from "../../src/constants"

describe("Session suite", () => {
    beforeEach(() => {
        cy.viewport("iphone-xr")
        cy.visit(Cypress.env().slug.index)
        cy.login({ user: "admin", password: "admin" })
        cy.url().should("include", "/chat")
        cy.get("article.Chat")
        cy.wait(SERVER_TYPING_INTERVAL * 2)
    })

    it("Should redirect to the login page if the session is expired and the page is reloaded", () => {
        cy.chat("Hi there!")
        cy.flushSession()
        cy.reload()
        cy.get("article.Login")
    })

    it("Should redirect to /chat if the session is not expired and the user goes to the login", () => {
        cy.flushSession()
        cy.visit(Cypress.env().slug.index)
        cy.login({ user: "admin", password: "admin" })
        cy.url().should("include", "/chat")
        cy.visit(Cypress.env().slug.index)
        cy.url().should("include", "/chat")
    })
})
