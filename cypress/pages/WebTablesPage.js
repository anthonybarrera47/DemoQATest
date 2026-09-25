import BasePage from './BasePage';

class WebTablesPage extends BasePage {
  selectors = {
    addNewRecordButton: '#addNewRecordButton',
    searchBox: '#searchBox',
    table: 'table',
    tableRows: 'table tbody tr',
    modal: '.modal-content',
    modalTitle: '#registration-form-modal',
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#userEmail',
    ageInput: '#age',
    salaryInput: '#salary',
    departmentInput: '#department',
    submitButton: '#submit',
  };

  visit() {
    super.visit('/webtables');
  }

  clickAddNewRecord() {
    this.click(this.selectors.addNewRecordButton);
    cy.get(this.selectors.modal).should('be.visible');
  }

  fillEmployeeForm(employee) {
    if (employee.firstName !== undefined)
      this.type(this.selectors.firstNameInput, employee.firstName);
    if (employee.lastName !== undefined) this.type(this.selectors.lastNameInput, employee.lastName);
    if (employee.email !== undefined) this.type(this.selectors.emailInput, employee.email);
    if (employee.age !== undefined) this.type(this.selectors.ageInput, employee.age);
    if (employee.salary !== undefined) this.type(this.selectors.salaryInput, employee.salary);
    if (employee.department !== undefined)
      this.type(this.selectors.departmentInput, employee.department);
    this.click(this.selectors.submitButton);
  }

  addNewRecord(employee) {
    this.clickAddNewRecord();
    this.fillEmployeeForm(employee);
    cy.get(this.selectors.modal).should('not.exist');
  }

  search(text) {
    cy.get(this.selectors.searchBox).clear();
    if (text) {
      cy.get(this.selectors.searchBox).type(text);
    }
  }

  editRecordByEmail(email, updatedData) {
    cy.get(this.selectors.tableRows)
      .contains('td', email)
      .parent('tr')
      .find('span[title="Edit"]')
      .click();

    cy.get(this.selectors.modal).should('be.visible');
    if (updatedData.salary !== undefined) {
      this.type(this.selectors.salaryInput, updatedData.salary);
    }
    if (updatedData.department !== undefined) {
      this.type(this.selectors.departmentInput, updatedData.department);
    }
    this.click(this.selectors.submitButton);
    cy.get(this.selectors.modal).should('not.exist');
  }

  deleteRecordByEmail(email) {
    cy.get(this.selectors.tableRows)
      .contains('td', email)
      .parent('tr')
      .find('span[title="Delete"]')
      .click();
  }

  verifyRecordExists(text) {
    cy.get(this.selectors.tableRows).contains('td', text).should('be.visible');
  }

  verifyRecordDoesNotExist(text) {
    cy.get(this.selectors.table).should('not.contain.text', text);
  }

  verifyNoRowsFound() {
    cy.get(this.selectors.tableRows).should('have.length', 0);
  }
}

export default new WebTablesPage();
