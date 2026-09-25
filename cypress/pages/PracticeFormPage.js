import BasePage from './BasePage';

class PracticeFormPage extends BasePage {
  selectors = {
    form: '#userForm',
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    userEmailInput: '#userEmail',
    genderRadios: {
      Male: 'label[for="gender-radio-1"]',
      Female: 'label[for="gender-radio-2"]',
      Other: 'label[for="gender-radio-3"]',
    },
    userNumberInput: '#userNumber',
    dateOfBirthInput: '#dateOfBirthInput',
    datePickerMonthSelect: '.react-datepicker__month-select',
    datePickerYearSelect: '.react-datepicker__year-select',
    subjectsInput: '#subjectsInput',
    hobbiesCheckboxes: {
      Sports: 'label[for="hobbies-checkbox-1"]',
      Reading: 'label[for="hobbies-checkbox-2"]',
      Music: 'label[for="hobbies-checkbox-3"]',
    },
    currentAddressInput: '#currentAddress',
    stateDropdown: '#state',
    cityDropdown: '#city',
    submitButton: '#submit',
    successModal: '.modal-content',
    modalTitle: '#example-modal-sizes-title-lg',
    modalTableRows: '.table-responsive tbody tr',
  };

  visit() {
    super.visit('/automation-practice-form');
  }

  fillPersonalDetails(firstName, lastName, email, gender, mobile) {
    if (firstName) this.type(this.selectors.firstNameInput, firstName);
    if (lastName) this.type(this.selectors.lastNameInput, lastName);
    if (email) this.type(this.selectors.userEmailInput, email);
    if (gender && this.selectors.genderRadios[gender]) {
      cy.get(this.selectors.genderRadios[gender]).click({ force: true });
    }
    if (mobile) this.type(this.selectors.userNumberInput, mobile);
  }

  selectDateOfBirth(day, month, year) {
    cy.get(this.selectors.dateOfBirthInput).click();
    if (year) {
      cy.get(this.selectors.datePickerYearSelect).select(year.toString());
    }
    if (month) {
      cy.get(this.selectors.datePickerMonthSelect).select(month);
    }
    if (day) {
      const formattedDay = day.toString().padStart(3, '0');
      cy.get(`.react-datepicker__day--${formattedDay}:not(.react-datepicker__day--outside-month)`)
        .first()
        .click();
    }
  }

  addSubjects(subjects = []) {
    subjects.forEach((subject) => {
      cy.get(this.selectors.subjectsInput).type(`${subject}{enter}`);
    });
  }

  selectHobbies(hobbies = []) {
    hobbies.forEach((hobby) => {
      if (this.selectors.hobbiesCheckboxes[hobby]) {
        cy.get(this.selectors.hobbiesCheckboxes[hobby]).click({ force: true });
      }
    });
  }

  fillAddressAndLocation(address, state, city) {
    if (address) {
      this.type(this.selectors.currentAddressInput, address);
    }
    if (state) {
      cy.selectReactDropdown(this.selectors.stateDropdown, state);
    }
    if (city) {
      cy.selectReactDropdown(this.selectors.cityDropdown, city);
    }
  }

  submit() {
    cy.removeAdBanners();
    cy.get(this.selectors.submitButton).scrollIntoView();
    cy.get(this.selectors.submitButton).click({ force: true });
  }

  fillEntireForm(data) {
    this.fillPersonalDetails(data.firstName, data.lastName, data.email, data.gender, data.mobile);
    if (data.dateOfBirth) {
      this.selectDateOfBirth(data.dateOfBirth.day, data.dateOfBirth.month, data.dateOfBirth.year);
    }
    if (data.subjects && data.subjects.length > 0) {
      this.addSubjects(data.subjects);
    }
    if (data.hobbies && data.hobbies.length > 0) {
      this.selectHobbies(data.hobbies);
    }
    this.fillAddressAndLocation(data.currentAddress, data.state, data.city);
  }

  verifySuccessModalVisible(expectedTitle = 'Thanks for submitting the form') {
    cy.get(this.selectors.successModal).should('be.visible');
    cy.get(this.selectors.modalTitle).should('contain.text', expectedTitle);
  }

  verifyModalRow(label, expectedValue) {
    cy.get(this.selectors.modalTableRows)
      .contains('td', label)
      .parent('tr')
      .find('td')
      .last()
      .should('contain.text', expectedValue);
  }

  // The close button has an unhandled React error in DemoQA, so we use Escape key
  closeSuccessModal() {
    cy.removeAdBanners();
    cy.get('body').type('{esc}');
    cy.get(this.selectors.successModal).should('not.exist');
  }

  verifyRequiredFieldErrors() {
    cy.get(this.selectors.firstNameInput).should('match', ':invalid');
    cy.get(this.selectors.lastNameInput).should('match', ':invalid');
    cy.get(this.selectors.userNumberInput).should('match', ':invalid');
    cy.get(this.selectors.successModal).should('not.exist');
  }
}

export default new PracticeFormPage();
