describe("Login", () => {
    beforeEach(() => {
        cy.viewport("macbook-15")
    })

    it("Should login", () => {
        cy.login({ user: "admin", password: "admin" })
        cy.url().should("include", "/chat")
        cy.get("article.Chat")
    })
})
