describe('Decode Site', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should include the decode text', () => {
    cy.get('h1').should('have.text', 'URL Decoder');
    cy.findByTestId('button-decode').should(
      'have.text',
      'Copy all decoded URLs'
    );
    cy.findByTestId('button-settings').click();
    cy.get('legend').eq(0).should('have.text', 'Trim decoded URL:');
  });

  it('Should include the encode text', () => {
    cy.findByTestId('button-swap').click();
    cy.get('h1').should('have.text', 'URL Encoder');
    cy.findByTestId('button-decode').should(
      'have.text',
      'Copy all encoded URLs'
    );
    cy.findByTestId('button-settings').click();
    cy.get('legend').eq(0).should('have.text', 'Trim encoded URL:');
  });
});
