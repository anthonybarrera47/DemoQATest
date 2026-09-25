import BasePage from './BasePage';

class AlertsPage extends BasePage {
  selectors = {
    alertButton: '#alertButton',
    timerAlertButton: '#timerAlertButton',
    confirmButton: '#confirmButton',
    promtButton: '#promtButton', // DemoQA spelling in DOM
    confirmResult: '#confirmResult',
    promptResult: '#promptResult',
  };

  visit() {
    super.visit('/alerts');
  }

  openAlert() {
    this.click(this.selectors.alertButton);
  }

  openTimerAlert() {
    this.click(this.selectors.timerAlertButton);
  }

  openConfirm() {
    this.click(this.selectors.confirmButton);
  }

  triggerPromptAlert(inputText = 'Cypress QA') {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(inputText).as('promptStub');
    });
    this.click(this.selectors.promtButton);
  }

  verifyConfirmResult(expectedText) {
    cy.get(this.selectors.confirmResult).should('be.visible').and('contain.text', expectedText);
  }

  verifyPromptResult(expectedText) {
    cy.get(this.selectors.promptResult).should('be.visible').and('contain.text', expectedText);
  }
}

export default new AlertsPage();
