import BasePage from './BasePage';

class SelectMenuPage extends BasePage {
  selectors = {
    selectValueDropdown: '#withOptGroup',
    selectOneDropdown: '#selectOne',
    oldStyleSelect: '#oldSelectMenu',
    standardMultiSelectCars: '#cars',
  };

  visit() {
    super.visit('/select-menu');
  }

  selectGroupValue(valueText) {
    cy.selectReactDropdown(this.selectors.selectValueDropdown, valueText);
  }

  selectOneOption(optionText) {
    cy.selectReactDropdown(this.selectors.selectOneDropdown, optionText);
  }

  selectOldStyleOption(optionTextOrValue) {
    cy.get(this.selectors.oldStyleSelect).select(optionTextOrValue);
  }

  selectStandardCars(carValues = []) {
    cy.get(this.selectors.standardMultiSelectCars).select(carValues);
  }

  verifyOldStyleSelection(expectedValue) {
    cy.get(this.selectors.oldStyleSelect).should('have.value', expectedValue);
  }

  verifyStandardCarsSelected(carValues = []) {
    cy.get(this.selectors.standardMultiSelectCars).then(($select) => {
      const selected = Array.from($select[0].selectedOptions).map((opt) => opt.value);
      carValues.forEach((val) => {
        expect(selected).to.include(val);
      });
    });
  }
}

export default new SelectMenuPage();
