import './commands';
import 'cypress-axe';

// Prevent test failure from third-party ad scripts crashing on DemoQA
Cypress.on('uncaught:exception', () => false);
