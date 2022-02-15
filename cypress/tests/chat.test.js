import { SERVER_TYPING_INTERVAL } from "../../src/constants"

describe("Chat suite", () => {
    beforeEach(() => {
        cy.viewport("iphone-xr")
        cy.visit(Cypress.env().slug.index)
        cy.login({ user: "admin", password: "admin" })
        cy.url().should("include", "/chat")
        cy.get("article.Chat")
    })

    afterEach(() => {
        cy.flushSession()
    })

    it("Chatbot should say hello to the user upon entering to the chat", () => {
        cy.wait(SERVER_TYPING_INTERVAL)
        cy.get(".Chat .message-list .message-item:first-child").contains(
            "Hi, I'm a bot!"
        )
    })

    it("Chatbot should change between 'Online' and 'Typing' statuses", () => {
        cy.wait(SERVER_TYPING_INTERVAL)
        cy.get(".Chat .chat-header .status").contains("Typing...")
        cy.wait(SERVER_TYPING_INTERVAL)
        cy.get(".Chat .chat-header .status").contains("Online")
    })

    it("Chatbot should not say anything until 'image' message is sent by the user", () => {
        cy.wait(SERVER_TYPING_INTERVAL * 3)
        cy.chat("Hi there!")
        cy.get(".Chat .message-list .message-item:last-child").contains(
            "Hi there!"
        )
        cy.chat("image")
        cy.wait(SERVER_TYPING_INTERVAL * 3)
        cy.get(".Chat .message-list .message-item:last-child img")
    })
})
