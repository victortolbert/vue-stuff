context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.url()
      .should('eq', 'http://localhost:5080/')

    cy.contains('[Home Layout]')
      .should('exist')

    cy.get('#input')
      .type('Exemplar{Enter}')

    cy.url()
      .should('eq', 'http://localhost:5080/hi/Exemplar')

    cy.contains('[Default Layout]')
      .should('exist')

    cy.get('[btn]').click()

    cy.url()
      .should('eq', 'http://localhost:5080/')
  })

  it('markdown', () => {
    cy.get('[title="About"]')
      .click()

    cy.url()
      .should('eq', 'http://localhost:5080/about')

    cy.get('.shiki')
      .should('exist')
  })
})
