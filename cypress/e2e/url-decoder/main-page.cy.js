/// <reference types="cypress" />

describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  context('Decode / Encode', () => {
    it('Should include the decode text', () => {
      cy.get('h1').should('have.text', 'URL Decoder');
      cy.findByTestId('button-copy-all').should(
        'have.text',
        'Copy all decoded URLs'
      );
      cy.findByTestId('button-settings').click();
      cy.get('legend').eq(0).should('have.text', 'Trim decoded URL:');
    });

    it('Should include the encode text', () => {
      cy.findByTestId('button-swap').click();
      cy.get('h1').should('have.text', 'URL Encoder');
      cy.findByTestId('button-copy-all').should(
        'have.text',
        'Copy all encoded URLs'
      );
      cy.findByTestId('button-settings').click();
      cy.get('legend').eq(0).should('have.text', 'Trim encoded URL:');
    });

    it('Should decode', () => {
      cy.get('textarea').eq(0).click();
      cy.get('textarea')
        .eq(0)
        .type('https://www.google.com/search?q=%D7%91%D7%93%D7%99%D7%A7%D7%94');
      cy.get('textarea')
        .eq(1)
        .should('have.text', 'https://www.google.com/search?q=בדיקה');
    });

    it('Should encode', () => {
      cy.findByTestId('button-swap').click();
      cy.get('textarea').eq(0).click();
      cy.get('textarea').eq(0).type('https://www.google.com/search?q=בדיקה');
      cy.get('textarea')
        .eq(1)
        .should(
          'have.text',
          'https://www.google.com/search?q=%D7%91%D7%93%D7%99%D7%A7%D7%94'
        );
    });
  });

  context('Buttons', () => {
    it('Should clear urls', () => {
      cy.get('textarea').eq(0).click();
      cy.get('textarea')
        .eq(0)
        .type('https://www.google.com/search?q=%D7%91%D7%93%D7%99%D7%A7%D7%94');
      cy.get('textarea').eq(0).invoke('val').should('not.be.empty');
      cy.get('textarea').eq(1).invoke('val').should('not.be.empty');
      cy.findByTestId('button-clear').click();
      cy.get('textarea').eq(0).invoke('val').should('be.empty');
      cy.get('textarea').eq(1).invoke('val').should('be.empty');
    });

    it('Should copy urls', () => {
      cy.get('textarea').eq(0).click();
      cy.get('textarea')
        .eq(0)
        .type('https://www.google.com/search?q=%D7%91%D7%93%D7%99%D7%A7%D7%94');
      cy.findByTestId('button-copy-all').click();
      cy.window()
        .its('navigator.clipboard')
        .invoke('readText')
        .should('equal', 'https://www.google.com/search?q=בדיקה');
    });
  });
});
