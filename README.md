# DemoQA Test Automation

Automated end-to-end test suite for [DemoQA](https://demoqa.com/) using Cypress and the Page Object Model (POM) pattern.

---

## Installation

```bash
# Install dependencies
npm install
```

---

## Running Tests

### Run all tests headless (default)
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run on specific browsers
```bash
npm run test:chrome
npm run test:edge
npm run test:firefox
```

### Run individual suites
```bash
npm run test:forms        # Student registration form suite
npm run test:selections   # Web tables and select menus suite
npm run test:dialogs      # Alerts and modal dialogs suite
```

### Open Cypress interactive runner
```bash
npm run cy:open
```
## Code Quality

```bash
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check formatting
```

---