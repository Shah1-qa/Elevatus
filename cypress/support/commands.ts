Cypress.Commands.add("runRoutes", (category) => {
  if (category == "jobs") {
    cy.intercept('GET', 'https://dammam-core-api.elevatus.io/api/v1/jobs').as('getJobs');
    cy.intercept('POST', 'https://dammam-core-api.elevatus.io/api/candidate/v1/register').as('postRegister');
    cy.intercept('GET', 'https://dammam-core-api.elevatus.io/api/candidate/v1/login').as('checkCandidate');
  }
});