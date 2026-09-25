import BasePage from './BasePage';

class ModalDialogsPage extends BasePage {
  selectors = {
    smallModalButton: '#showSmallModal',
    largeModalButton: '#showLargeModal',
    modalContainer: '.modal-content',
    modalBody: '.modal-body',
    closeSmallModalButton: '#closeSmallModal',
    closeLargeModalButton: '#closeLargeModal',
  };

  visit() {
    super.visit('/modal-dialogs');
  }

  openSmallModal() {
    this.click(this.selectors.smallModalButton);
    cy.get(this.selectors.modalContainer).should('be.visible');
  }

  openLargeModal() {
    this.click(this.selectors.largeModalButton);
    cy.get(this.selectors.modalContainer).should('be.visible');
  }

  closeSmallModal() {
    this.click(this.selectors.closeSmallModalButton);
    cy.get(this.selectors.modalContainer).should('not.exist');
  }

  closeLargeModal() {
    this.click(this.selectors.closeLargeModalButton);
    cy.get(this.selectors.modalContainer).should('not.exist');
  }

  verifyModalTitle(expectedTitle) {
    cy.get('.modal-title').should('be.visible').and('contain.text', expectedTitle);
  }

  verifyModalBodyContent(expectedSnippet) {
    cy.get(this.selectors.modalBody).should('be.visible').and('contain.text', expectedSnippet);
  }
}

export default new ModalDialogsPage();
