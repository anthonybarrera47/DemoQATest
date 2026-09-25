import webTablesPage from '../pages/WebTablesPage';
import selectMenuPage from '../pages/SelectMenuPage';

describe('DemoQA - Selections, Tables and Menus', () => {
  describe('Web Tables Interactions', () => {
    beforeEach(() => {
      webTablesPage.visit();
    });

    it('should filter records using the search box', () => {
      cy.fixture('webTableData').then((data) => {
        webTablesPage.search(data.searchQuery);
        webTablesPage.verifyRecordExists(data.searchQuery);
        webTablesPage.verifyRecordDoesNotExist('Alden');
      });
    });

    it('should display "No rows found" when searching for non-existent records', () => {
      cy.fixture('webTableData').then((data) => {
        webTablesPage.search(data.nonExistentQuery);
        webTablesPage.verifyNoRowsFound();
      });
    });

    it('should add a new employee record and verify it in the table', () => {
      cy.fixture('webTableData').then((data) => {
        const emp = data.newEmployee;
        webTablesPage.addNewRecord(emp);

        webTablesPage.verifyRecordExists(emp.firstName);
        webTablesPage.verifyRecordExists(emp.email);
        webTablesPage.verifyRecordExists(emp.department);
      });
    });

    it('should edit an existing record and verify updated values', () => {
      cy.fixture('webTableData').then((data) => {
        const targetEmail = 'cierra@example.com';
        const update = data.updatedEmployee;

        webTablesPage.editRecordByEmail(targetEmail, update);

        webTablesPage.verifyRecordExists(update.salary);
        webTablesPage.verifyRecordExists(update.department);
      });
    });

    it('should delete a record from the table', () => {
      const emailToDelete = 'alden@example.com';
      webTablesPage.verifyRecordExists(emailToDelete);

      webTablesPage.deleteRecordByEmail(emailToDelete);
      webTablesPage.verifyRecordDoesNotExist(emailToDelete);
    });
  });

  describe('Select Menu and Dropdowns', () => {
    beforeEach(() => {
      selectMenuPage.visit();
    });

    it('should select an option from standard HTML dropdown', () => {
      selectMenuPage.selectOldStyleOption('Purple');
      selectMenuPage.verifyOldStyleSelection('4');
    });

    it('should select multiple options from standard multi-select', () => {
      const selectedCars = ['volvo', 'audi'];
      selectMenuPage.selectStandardCars(selectedCars);
      selectMenuPage.verifyStandardCarsSelected(selectedCars);
    });

    it('should select options from custom React select dropdowns', () => {
      selectMenuPage.selectGroupValue('Group 1, option 2');
      cy.get('#withOptGroup').should('contain.text', 'Group 1, option 2');

      selectMenuPage.selectOneOption('Dr.');
      cy.get('#selectOne').should('contain.text', 'Dr.');
    });
  });
});
