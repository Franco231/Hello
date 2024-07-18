Cypress.Commands.add("el", (selector, ...args) => {
  return cy.get(`[id=${selector}]`, ...args);
});
