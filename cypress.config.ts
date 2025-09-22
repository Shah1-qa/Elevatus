import { defineConfig } from "cypress";
import { getActivationLink } from "./cypress/support/msilosaur";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register custom task
      on("task", {
        async getActivationLinkTask({
          serverId,
          apiKey,
          email,
        }: {
          serverId: string;
          apiKey: string;
          email: string;
        }) {
          return await getActivationLink(serverId, apiKey, email);
        },
      });

      return config;
    },
    baseUrl: "https://automationszaid.elevatus.io",
    viewportHeight: 1080,
    viewportWidth: 1920,
    pageLoadTimeout: 20000,
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
    execTimeout: 60000,
    numTestsKeptInMemory: 4,
    experimentalMemoryManagement: true,
  },
});
