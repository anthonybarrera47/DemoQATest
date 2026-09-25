import alertsPage from '../pages/AlertsPage';
import modalDialogsPage from '../pages/ModalDialogsPage';

describe('DemoQA - Dialogs, Alerts and Modals Suite', () => {
  describe('Browser Alerts Interactions', () => {
    beforeEach(() => {
      alertsPage.visit();
    });

    it('should handle standard JavaScript alert', () => {
      const alertStub = cy.stub().as('alertStub');
      cy.on('window:alert', alertStub);

      alertsPage.openAlert();
      cy.get('@alertStub').should('have.been.calledWith', 'You clicked a button');
    });

    it('should handle delayed timer alert (5 seconds)', () => {
      const alertStub = cy.stub().as('timerAlertStub');
      cy.on('window:alert', alertStub);

      alertsPage.openTimerAlert();
      cy.get('@timerAlertStub', { timeout: 8000 }).should(
        'have.been.calledWith',
        'This alert appeared after 5 seconds'
      );
    });

    it('should handle confirm alert by clicking OK', () => {
      const confirmStub = cy.stub().returns(true).as('confirmStub');
      cy.on('window:confirm', confirmStub);

      alertsPage.openConfirm();
      cy.get('@confirmStub').should('have.been.calledWith', 'Do you confirm action?');
      alertsPage.verifyConfirmResult('You selected Ok');
    });

    it('should handle confirm alert by clicking Cancel', () => {
      const confirmStub = cy.stub().returns(false).as('confirmCancelStub');
      cy.on('window:confirm', confirmStub);

      alertsPage.openConfirm();
      cy.get('@confirmCancelStub').should('have.been.calledWith', 'Do you confirm action?');
      alertsPage.verifyConfirmResult('You selected Cancel');
    });

    it('should handle prompt alert and verify submitted input', () => {
      const inputPromptText = 'QA Automation Input';
      alertsPage.triggerPromptAlert(inputPromptText);
      alertsPage.verifyPromptResult(`You entered ${inputPromptText}`);
    });
  });

  describe('Modal Dialogs Interactions', () => {
    beforeEach(() => {
      modalDialogsPage.visit();
    });

    it('should open and close the Small Modal', () => {
      modalDialogsPage.openSmallModal();
      modalDialogsPage.verifyModalTitle('Small Modal');
      modalDialogsPage.verifyModalBodyContent('This is a small modal');
      modalDialogsPage.closeSmallModal();
    });

    it('should open and close the Large Modal', () => {
      modalDialogsPage.openLargeModal();
      modalDialogsPage.verifyModalTitle('Large Modal');
      modalDialogsPage.verifyModalBodyContent('Lorem Ipsum is simply dummy text');
      modalDialogsPage.closeLargeModal();
    });
  });
});
