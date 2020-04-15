describe('NewEventForm', () => {
  beforeEach(() => {
    cy.visit('/add-event')
  })
  it('should display an error above the form if the form is submitted incorrectly', () => {
    cy.get('form').submit()
    cy.get('p').eq(1).should('be.visible')
  });
  it('should display a happy message if the event is created', () => {
    cy.get('input').eq(0).type('Soccer Game')
    cy.get('input').eq(1).type(15)
    cy.get('input').eq(2).type('2020-04-20')
    cy.get('input').eq(3).type('04:50')
    cy.get('input').eq(4).type(105)
    cy.get('textarea').type('make sure to park in Lot B')
    cy.get('form').submit()
    cy.get('p').eq(3).should('be.visible')
  });
})