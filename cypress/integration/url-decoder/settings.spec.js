describe('Setting Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should verify modal', () => {
    cy.findByTestId('button-settings').click();
    cy.get('dialog').should('have.length', 1);
    cy.get('legend').should('have.length', 2);
  });
});
