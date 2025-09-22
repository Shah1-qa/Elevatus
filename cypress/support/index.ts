declare global {
  namespace Cypress {
    interface Chainable {
      runRoutes(category: string): Chainable<void>;
    }
  }
}
