import { should } from "chai";
import { interceptResponseCodeWait } from "./common";

export function languageDropdownValues(dropdownValues:string) {
    return cy.get('div.language-change-items-wrapper button').contains(dropdownValues).should('be.visible');
}

export function registartionForm(firstName:string,lastName:string,email:string,password:string,confirmPassword:string, phoneNumber:string){
    cy.get('input[placeholder="First name"]').should('be.visible').type(firstName);
    cy.get('input[placeholder="Last name"]').should('be.visible').type(lastName);
    cy.get('input[placeholder="Email"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password);
    cy.get('input[placeholder="Confirm Password"]').should('be.visible').type(confirmPassword);
    cy.get('input[placeholder="Phone number"]').should('be.visible').type(phoneNumber);
    cy.get('span[class="text-muted"]').contains('I have read and agree to the').should('be.visible').click();
    cy.get('button[type="submit"]').contains('Sign up').should('be.visible').click();
}

export function loginForm(email:string,password:string){
    cy.get('input[placeholder="Email"]').should('be.visible').type(email);
    cy.get('input[placeholder="Password"]').should('be.visible').type(password);
    cy.get('span.MuiTypography-root').should('be.visible').click();
    //Sign In Button
    cy.get('button.btn-main').contains('Sign in').should('be.visible').click();
    //Asseertion Singed In Successfuly
    cy.get('div.react-toast-notifications__toast__content.css-1ad3zal').contains('Signed In!').should('be.visible');
}

export function submitCV(yourself:string,phoneNumber:string, dob:string){
    cy.get('textarea[id="description"]').should('be.visible').type(yourself);
    cy.get('input[placeholder="Phone number"]').should('be.visible').type(phoneNumber);
    cy.get('input[placeholder="yyyy-mm-dd"]').should('be.visible').type(dob);
    cy.get('input[id="gender"]').should('be.visible').type("female{enter}");
    cy.get('input[id="nationality"]').should('be.visible').type("Pakistani{enter}");
    cy.get('input[id="salutation_uuid"]').should('be.visible').type('mss{enter}');
    cy.get('input[id="national_id"]').should('be.visible').type('123456789');
    cy.get('input[id="address"]').should('be.visible').type('Test Address Shah');
    cy.get('input[id="city"]').eq(0).should('be.visible').type('Riyadh');
    cy.get('input[id="location.country_uuid"]').should('be.visible').type('Jordan{enter}');
    cy.get('input[id="city"]').eq(1).should('be.visible').type('123456');
    cy.get('input[id="right_to_work.country_uuid"]').should('be.visible').type('Jordan{enter}');
    cy.get('input[placeholder="Document type"]').should('be.visible').type('pdf{enter}');
    cy.get('input[id="job_types"]').should('be.visible').type('Full Time{enter}');
    cy.get('input[placeholder="Are you willing to travel?"]').should('be.visible').type('Yes');
    cy.get('li[id="SharedAutocompleteControl--0---0-0-willing_to_travel-option-0"]').should('be.visible').click();
    // cy.get('input[placeholder="Are you willing to relocate?"]').should('be.visible').type('Yes');
    // cy.get('li[id="SharedAutocompleteControl--0---0-0-willing_to_travel-option-0"]').should('be.visible').click();
    cy.get('button.MuiButtonBase-root.my-4 span').contains('Submit').should('be.visible').click();

    //Confirmation Popup
    cy.get('span.dialog-title-text').contains('Confirmations Message').should('be.visible');
    cy.get('button.MuiButtonBase-root.save-btn-wrapper span').contains('Confirm').should('be.visible').click();

}