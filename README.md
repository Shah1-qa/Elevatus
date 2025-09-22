# Elevatus
📘 Cypress Automation with Mailosaur & File Upload

This project demonstrates end-to-end automation using Cypress
, including:

✅ Cypress installation & project setup

✅ Organizing tests and support files

✅ Using fixtures for test data & file uploads

✅ Mailosaur integration to fetch activation/verification emails

✅ File upload functionality (PDF from fixtures)

🚀 1. Installation

Initialize project (if not already):

npm init -y


Install Cypress:

npm install cypress --save-dev


Open Cypress for the first time (this scaffolds folders):

npx cypress open


You should now see cypress/ folder created with e2e, fixtures, support etc.

📂 2. Project Structure
cypress/
  e2e/                # Spec/test files
  fixtures/           # Test data & upload files (e.g. resume.pdf)
  support/
    e2e.ts            # Global before/after hooks
    msilosaur.ts      # Mailosaur helper function
    utils.ts          # Utility functions (e.g. upload PDF)
cypress.config.ts     # Cypress configuration



🔑 3. Environment Variables

Update cypress.config.ts to include Mailosaur credentials:


📧 4. Mailosaur Setup
Install Mailosaur SDK:
npm install mailosaur --save-dev



🧪 5. Example Test – Registration Flow with Mailosaur

cypress/e2e/citizen-portal/registrationFlow.cy.ts:


📂 6. File Upload (PDF from Fixtures)
Install Cypress File Upload Plugin:


▶️ 7. Running Tests

Open Cypress runner:

npx cypress open


Run headless (CI/CD mode):

npx cypress run


✅ Summary

You now have:

Cypress project set up

Configured Mailosaur for email verification links

Utility for uploading PDF files from fixtures

Example tests covering registration flow & file upload