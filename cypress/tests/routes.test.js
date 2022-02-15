describe("Routes suite", () => {
    beforeEach(() => {
        cy.viewport("iphone-xr")
    })

    afterEach(() => {
        cy.flushSession()
    })

    it("Should render the login page on /", () => {
        cy.visit(Cypress.env().slug.index)
        cy.get("article.Login")
    })

    it("Should render the login page after visiting /chat without login", () => {
        cy.visit(Cypress.env().slug.chat)
        cy.get("article.Login")
    })

    it("Should render the chat page on /chat", () => {
        cy.visit(Cypress.env().slug.index)
        cy.login({ user: "admin", password: "admin" })
        cy.url().should("include", "/chat")
        cy.get("article.Chat")
    })

    it("Should render the 404 page on /*", () => {
        cy.visit(Cypress.env().slug.notFound)
        cy.get("article.NotFound")
    })
})
