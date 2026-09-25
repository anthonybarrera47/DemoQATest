import practiceFormPage from '../pages/PracticeFormPage';

describe('DemoQA - Student Registration Form', () => {
  beforeEach(() => {
    practiceFormPage.visit();
  });

  it('should successfully submit the registration form with valid data', () => {
    cy.fixture('formData').then((data) => {
      const student = data.validStudent;

      practiceFormPage.fillEntireForm(student);
      practiceFormPage.submit();

      practiceFormPage.verifySuccessModalVisible();
      practiceFormPage.verifyModalRow('Student Name', `${student.firstName} ${student.lastName}`);
      practiceFormPage.verifyModalRow('Student Email', student.email);
      practiceFormPage.verifyModalRow('Gender', student.gender);
      practiceFormPage.verifyModalRow('Mobile', student.mobile);
      practiceFormPage.verifyModalRow('Subjects', student.subjects.join(', '));
      practiceFormPage.verifyModalRow('Hobbies', student.hobbies.join(', '));
      practiceFormPage.verifyModalRow('Address', student.currentAddress);
      practiceFormPage.verifyModalRow('State and City', `${student.state} ${student.city}`);

      practiceFormPage.closeSuccessModal();
    });
  });

  it('should prevent submission and highlight required fields when submitted empty', () => {
    practiceFormPage.submit();

    cy.get(practiceFormPage.selectors.successModal).should('not.exist');
    practiceFormPage.verifyRequiredFieldErrors();
  });

  it('should fail validation when invalid email and non-numeric phone number are provided', () => {
    cy.fixture('formData').then((data) => {
      const invalid = data.invalidStudent;

      practiceFormPage.fillPersonalDetails('John', 'Doe', invalid.email, 'Male', invalid.mobile);
      practiceFormPage.submit();

      cy.get(practiceFormPage.selectors.userEmailInput).should('match', ':invalid');
      cy.get(practiceFormPage.selectors.userNumberInput).should('match', ':invalid');
      cy.get(practiceFormPage.selectors.successModal).should('not.exist');
    });
  });

  it('should conduct lightweight accessibility checks on the form', () => {
    practiceFormPage.checkAccessibility('#userForm');
  });
});
