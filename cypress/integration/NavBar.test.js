describe('NavBar', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should visit the dashboard after clicking the dashboard nav button', () => {
    cy.get('a').eq(2).click()
    .url().should('eq', 'http://localhost:5000/dashboard')
  });
  it('should visit the add-event page after clicking the Add New Event nav button', () => {
    cy.get('a').eq(1).click()
    .url().should('eq', 'http://localhost:5000/add-event')
  })
})