/// <reference types="cypress" />

/**
 * Uploads a PDF file to a given file input.
 * @param selector - CSS/XPath selector for the input element
 * @param fileName - File name stored in `cypress/fixtures`
 */

export function uploadPdfFromFixtures(selector: string, fileName: string) {
  cy.get(selector).attachFile({
    filePath: fileName,           // looks inside cypress/fixtures
    mimeType: 'application/pdf',
  });
}

export function interceptResponseCodeWait(apiAlias:string,responseCode:number,) {
    return cy.wait(apiAlias)
        .its('response.statusCode')
        .should('eq', responseCode);
}
