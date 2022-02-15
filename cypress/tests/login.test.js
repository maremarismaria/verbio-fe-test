describe("Login suite", () => {
    beforeEach(() => {
        cy.viewport("iphone-xr")
        cy.flushSession()
    })

    it("Should login", () => {
        cy.login({ user: "admin", password: "admin" })
        cy.url().should("include", "/chat")
        cy.get("article.Chat")
    })

    it("Should not login due to bad credentials", () => {
        cy.login({ user: "admin", password: "wrong" })
        cy.get("article.Login")
    })

    it("Should not send the login form because some field is empty or invalid", () => {
        cy.login({ user: "admin" })
        cy.get("article.Login")

        cy.login({ password: "admin" })
        cy.get("article.Login")
    })
})
