describe('Login page', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should be accessible', () => {
        cy.injectAxe()
        cy.checkA11y()
    })

    it('should have a title', () => {
        cy.title().should('include', 'Login')
    })

    it('should have one header', () => {
        cy.get('h1')
            .should('have.length', 1)
            .should('contain', 'Login')
    })

    it('should have a form', () => {
        cy.get('form')
            .should('have.length', 1)
    })

    it('should have a subheading', () => {
        cy.get('h2')
            .should('exist')
    })

    it('should have a description', () => {
        cy.get('p')
            .should('exist')
    })
})