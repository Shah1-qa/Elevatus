/// <reference types="cypress" />
import { interceptResponseCodeWait, uploadPdfFromFixtures } from '../../support/common';
import { languageDropdownValues, loginForm, registartionForm, submitCV } from '../../support/registrationFlow';
import user from "../../fixtures/testData.json";
import 'cypress-file-upload';

describe('Candidate Portal', () => {
  let testData: any;
  beforeEach(() => {
    // Visit the url
    cy.visit('/')
  })

  it('Verify default state before login', () => {
    cy.runRoutes('jobs');
    //Verfy Jobs API response code 200 
    interceptResponseCodeWait('@getJobs', 200);
    //cookie-drawer content
    cy.get('div.drawer-content div h3').contains('This site uses cookies.').should('be.visible');
    cy.get('div.cookie-drawer div div').contains('Some of these cookies are essential, while others help us to improve your experience by providing insights into how the site is being used.').should('be.visible');
    cy.get('div.cookie-drawer div div').contains('For more detailed information on the cookies we use, please check our').should('be.visible');

    // Accept Cookies button
    cy.get('div.text-center button').contains('I Accept Recommended Cookies').should('be.visible').click();

    // Verify Elevatus logo and Header Sections
    cy.get('img[alt="company-logo"]').should('be.visible');
    cy.get('button.MuiButtonBase-root.btns p').contains('Homefdf').should('be.visible');
    cy.get('button.MuiButtonBase-root div').contains('Jobs').should('be.visible');

    //Login button
    cy.get('button.MuiButtonBase-root span').contains('Login').should('be.visible');
    //Register button
    cy.get('button.MuiButtonBase-root span').contains('Register').should('be.visible');
    //Language dropdown
    cy.get('button.MuiButtonBase-root span').contains('English').should('be.visible').click();
    //Dropdown options
    languageDropdownValues(' العربية');
    languageDropdownValues('Türkçe');
    languageDropdownValues('Română');
    languageDropdownValues('English').click();

    //Main Body section UI verifications
    cy.get('div.header-section-title p').contains('Welcome to our ').should('be.visible');
    cy.get('div.header-section-subtitle p').contains('Join us an,d discover an exciting range of career opportunities within the digital world').should('be.visible');

    //Register Button
    cy.get('div.menu-auth-wrapper button span').contains('Register').should('be.visible').click();

    //Verify Register page
    cy.get('h1.sc-kAyceB').contains('Welcome!').should('be.visible');
    cy.get('h4.sc-imWYAI.cLucWk').contains('Create a new account').should('be.visible');

    //Register form fields
    registartionForm('TestFirstName', 'TestLastName', user.testEmail, 'Test@1234', 'Test@1234', '3029604757')
    //Verify Registaer API response code 200
    interceptResponseCodeWait('@postRegister', 200);

    //Post Login UI verifications
    cy.get('div.react-toast-notifications__toast__content.css-1ad3zal').contains('If an account does not exist with this email address, an email will be sent with instructions to registration.').should('be.visible');
    cy.get('div.h4.mt-2.text-center').contains('Registered successfully').should('be.visible');
    cy.get('div.mb-4.mb-md-9.mt-4.mt-md-8').contains('If an account does not exist with this email address, an email will be sent with instructions to registration.').should('be.visible');


  })

  it('Complete Registration process and Apply to the Job', () => {
    cy.task("getActivationLinkTask", {
      serverId: Cypress.env("MAILOSAUR_SERVER_ID"),
      apiKey: Cypress.env("MAILOSAUR_API_KEY"),
      email: user.testEmail,
    }).then((activationLink) => {
      const link = activationLink as string;  // ✅ cast to string
      // cy.log(link);
      cy.visit(link);
      // Accept Cookies button
      cy.get('div.text-center button').contains('I Accept Recommended Cookies').should('be.visible').click();

      //Login Page Assertions
      cy.get('h1.sc-iGgWBj.csTtJa.display-2').contains('Welcome').should('be.visible');
      cy.get('h4.sc-gsFSXq.bYnxKa').contains('Login to your account').should('be.visible');

      //Login Forom
      loginForm(user.testEmail, user.password);

      // Job Categories Page
      cy.get('h1.sc-iGgWBj').contains('Select Job Category').should('be.visible');
      // cy.get('p.text-center').contains('To continue your registration, please select the job category that you want to apply for (you can select more than one category).').should('be.visible');

      //Category Dropdown
      cy.get('input[id="tags-outlined"]').should('be.visible').type('new Candidate{enter}');
      cy.wait(2000);
      cy.get('li[id="tags-outlined-option-0"]').should('be.visible').click();

      //Cancel Icon
      cy.get('svg[data-testid="CancelIcon"]').should('be.visible').click();

      //Category Dropdown
      cy.get('input[id="tags-outlined"]').should('be.visible').type('new Candidate{enter}');
      cy.wait(2000);
      cy.get('li[id="tags-outlined-option-0"]').should('be.visible').click();

      //Continue Button
      cy.get('button.btn-main.my-4').contains('Continue').should('be.visible').click();

      //Building you profile page
      cy.get('h1.sc-iGgWBj.csTtJa').contains('Building your profile').should('be.visible');

      //Assertions
      cy.get('h6.text-center.font-weight-500').contains(`Let’s build your profile together!`).should('be.visible');
      cy.get('P.text-center').contains('To get started, choose one of the following options:').should('be.visible');

      //Fill In Manually
      cy.get('I.mdi.mdi-hand-pointing-up').should('be.visible').click();

      //Assertions
      cy.get('h4.mb-0.px-4').contains('Submit Your CV').should('be.visible');

      submitCV('ShahBahram Resume', '123456789', '1990-01-01');

      //Navigate to jobs section
      cy.get('button.MuiButtonBase-root.btns').contains('Jobs').should('be.visible').click();

      //Jobs Postings
      cy.get('h3.mb-4.font-weight-bold').contains('Recent Openings').should('be.visible');

      // //Search Skills
      // cy.get('input[id=":r1s:"]').should('be.visible').click().type('New Candidate Automation{enter}');
      // cy.get('button[type="button"]').contains('Search').should('be.visible').click();

      // //View Button
      // cy.get('button.btn-outline-main.mx-0.btn').should('be.visible').click();

      // //Verify Job Details page
      // cy.get('h4.text-main.mb-0.font-weight-bold').contains('new candidate automation').should('be.visible');

      // //Apply button 
      // cy.get('button.btn-main.ml-sm-auto').contains('Apply').should('be.visible').click();





    });
  });

})
