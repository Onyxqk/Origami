describe('Scenario: Initial load', () => {

    describe('Given the user launches Origami' + ' When the page is loaded', () => {

        // load Origami running on localhost
        before(() => {
            cy.visit('localhost:4200/')
        })

        it('Then the title of the page is Origami', () => {
            cy.title().should('eq', 'Origami')
        })

        it('And the canvas is displayed', () => {
            cy.get('#canvasElement').should('be.visible')
        })

        it('And there are no detected accessibility violations', () => {
            // inject Axe accessibility testing
            cy.injectAxe()
            // test the page for accessibility
            cy.checkA11y()
        })
    })
})