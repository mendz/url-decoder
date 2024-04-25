describe('Toasts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  context('Error / Success', () => {
    it('Should show error toast', () => {
      cy.findByTestId('toast').should('not.exist');
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('toast').should('exist');
      cy.findByTestId('toast').should('contain.text', 'ERROR');
    });

    it('Should show success toast', () => {
      cy.findByTestId('toast').should('not.exist');
      cy.get('textarea').eq(0).click();
      cy.get('textarea').eq(0).type('some text');
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('toast').should('exist');
      cy.findByTestId('toast').should('not.contain.text', 'ERROR');
    });
  });

  context('More then one', () => {
    it('Should show another toasts when clicking again', () => {
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('button-copy-all').click();
      cy.findAllByTestId('toast').should('have.length', 2);
      cy.findAllByTestId('toast').should('contain.text', 'ERROR');
    });

    it('Should show two toasts success + error', () => {
      cy.get('textarea').eq(0).click();
      cy.get('textarea').eq(0).type('some text');
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('button-clear').click();
      cy.findByTestId('button-copy-all').click();
      cy.findAllByTestId('toast').should('have.length', 2);
      cy.findAllByTestId('toast').eq(0).should('contain.text', 'ERROR');
      cy.findAllByTestId('toast').eq(1).should('not.contain.text', 'ERROR');
    });
  });

  context('Close toast', () => {
    it('Should close that toast by clicking the X', () => {
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('toast').should('exist');
      cy.findByTestId('button-toast-close').click();
      cy.findByTestId('toast').should('not.exist');
    });

    it('Should close that toast by clicking the toast', () => {
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('toast').should('exist');
      cy.findByTestId('toast').click();
      cy.findByTestId('toast').should('not.exist');
    });

    it('Should close the first toast', () => {
      cy.get('textarea').eq(0).click();
      cy.get('textarea').eq(0).type('some text');
      cy.findByTestId('button-copy-all').click();
      cy.findByTestId('button-clear').click();
      cy.findByTestId('button-copy-all').click();
      cy.findAllByTestId('toast').eq(1).click();
      cy.findAllByTestId('toast').should('have.length', 1);
      cy.findAllByTestId('toast').eq(0).should('contain.text', 'ERROR');
    });
  });
});
