class BasePage {
  visit(path) {
    cy.visit(path);
    cy.removeAdBanners();
  }

  click(selector, options = {}) {
    cy.removeAdBanners();
    cy.get(selector).scrollIntoView();
    cy.get(selector).should('be.visible');
    cy.get(selector).click(options);
  }

  type(selector, text, options = {}) {
    cy.get(selector).scrollIntoView();
    cy.get(selector).should('be.visible');
    cy.get(selector).clear();
    cy.get(selector).type(text, options);
  }

  checkAccessibility(context = null, options = null) {
    cy.injectAxe();
    cy.checkA11y(
      context,
      options || {
        includedImpacts: ['critical', 'serious'],
      },
      null,
      true
    );
  }
}

export default BasePage;
