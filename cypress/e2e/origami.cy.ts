describe('Scenario: Initial load', () => {

    describe('Given the user launches Origami' + ' When the page is loaded', () => {
        it('Then the title of the page is Origami', () => {
            cy.visit('localhost:4200/')
            cy.title().should('eq', 'Origami')
        })

        it('And there are no detected accessibility violations', () => {
            cy.visit('localhost:4200/')
            // inject Axe accessibility testing
            cy.injectAxe()
            // test the page for accessibility
            cy.checkA11y(null,
                {
                    runOnly: {
                      type: 'tag',
                      values: ['wcag2a']
                    }
                  }
            )
        })
    })
})

describe('Scenario: Opening Origami menu', () => {
    describe('Given the user launches Origami' + ' When the user opens the Origami menu', () => {
        it('Then there are no detected accessibility violations', () => {
            cy.viewport(1500, 500)
            cy.visit('localhost:4200/')
            cy.get('.origami-button').click();
            // inject Axe accessibility testing
            cy.injectAxe()
            // test the page for accessibility
            cy.checkA11y(null,
                {
                    runOnly: {
                      type: 'tag',
                      values: ['wcag2a']
                    }
                  }
            )
        })
    })
})