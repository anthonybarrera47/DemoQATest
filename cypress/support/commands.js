// Remove ad banners and footers on DemoQA that block click targets
Cypress.Commands.add('removeAdBanners', () => {
  cy.get('body').then(($body) => {
    const adSelectors = [
      '#fixedban',
      '#adplus-anchor',
      'footer',
      'iframe[id^="google_ads_iframe"]',
      'div[id*="google_ads"]',
    ];

    adSelectors.forEach((selector) => {
      const elements = $body.find(selector);
      if (elements.length > 0) {
        elements.remove();
      }
    });
  });
});

// Helper for DemoQA react-select dropdown elements
Cypress.Commands.add('selectReactDropdown', (containerSelector, optionText) => {
  cy.get(containerSelector).scrollIntoView();
  cy.get(containerSelector).click({ force: true });
  cy.get(containerSelector).find('input').type(`${optionText}{enter}`, { force: true });
});
