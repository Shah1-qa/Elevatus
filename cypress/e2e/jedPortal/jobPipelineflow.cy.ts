import { interceptResponseCodeWait } from "../../support/common";

describe('Candidate Portal', () => {
  let testData: any;
  beforeEach(() => {
    // Visit the url
    cy.visit('https://jed-portal.elevatus.io/el/login')
  })

  it('Verify default state before login', () => {
    cy.runRoutes('jobs');
    cy.get('input[placeholder="Email"]').should('be.visible').type('z.lafi+elevatustest@elevatus.io');
    cy.get('input[placeholder="Password"]').should('be.visible').type('Zaid123123%%');
    cy.wait(2000)
    cy.get('button[type="submit"]').contains('Sign in').should('be.visible').click();
    cy.wait(2000)

    //Job board
    cy.get('href="/recruiter/job/manage"').should('be.visible').click();

    cy.wait(2000)
    //open Job pipeline
    cy.get('a[href="/recruiter/job/manage/pipeline/bb5a3885-04f9-45b4-bf3f-34d240c297fd"]').should('be.visible').click();
    
  })
})