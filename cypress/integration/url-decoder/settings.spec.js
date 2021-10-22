describe('Setting Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Should verify modal', () => {
    cy.findByTestId('button-settings').click();
    cy.get('dialog').should('exist');
    cy.get('fieldset').should('have.length', 2);
  });

  context('Closing Setting', () => {
    it('Should close when pressing cancel', () => {
      cy.findByTestId('button-settings').click();
      cy.findByTestId('button-close').click();
      cy.get('dialog').should('not.exist');
    });

    it('Should close when press escape', () => {
      cy.findByTestId('button-settings').click();
      cy.get('dialog').type('{esc}');
      cy.get('dialog').should('not.exist');
    });

    // it('Should close when clicking on the background', () => {
    //   cy.findByTestId('button-settings').click();
    //   cy.waitFor(500);
    //   cy.get('dialog').click();
    //   cy.get('dialog').should('not.exist')
    // });
  });

  context('Change Values', () => {
    it('Should not save the values when closing the popup', () => {
      cy.findByTestId('button-settings').click();
      cy.get('input#SHOW').click();
      cy.findByTestId('button-close').click();
      cy.findByTestId('button-settings').click();
      cy.get('input#SHOW').should('not.be.checked');

      cy.get('input#TRIM_DOMAIN').click();
      cy.findByTestId('button-close').click();
      cy.findByTestId('button-settings').click();
      cy.get('input#TRIM_DOMAIN').should('not.be.checked');
    });

    it('Should keep the values when saving the settings', () => {
      cy.findByTestId('button-settings').click();
      cy.get('input#SHOW').click();
      cy.get('button[type="submit"]').click();
      cy.findByTestId('button-settings').click();
      cy.get('input#SHOW').should('be.checked');

      cy.get('input#TRIM_DOMAIN').click();
      cy.get('button[type="submit"]').click();
      cy.findByTestId('button-settings').click();
      cy.get('input#TRIM_DOMAIN').should('be.checked');
    });

    it('Should show/hide the decode current button by the settings', () => {
      cy.findByTestId('button-decode-current').should('not.exist');
      cy.findByTestId('button-settings').click();
      cy.get('input#SHOW').click();
      cy.get('button[type="submit"]').click();
      cy.findByTestId('button-decode-current').should('exist');

      cy.findByTestId('button-settings').click();
      cy.get('input#NOT_SHOW').click();
      cy.get('button[type="submit"]').click();
      cy.findByTestId('button-decode-current').should('not.exist');
    });

    it('Should not be able to change show checked when encoding', () => {
      cy.findByTestId('button-swap').click();
      cy.findByTestId('button-settings').click();
      cy.get('fieldset').eq(1).should('be.disabled');
      cy.get('fieldset')
        .eq(1)
        .invoke('attr', 'title')
        .should('eq', `Can't use while encoding`);
      cy.get('input#NOT_SHOW').should('be.disabled');
      cy.get('input#NOT_SHOW').should('be.disabled');
    });
  });
});
