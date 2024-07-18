const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  e2e: {
    specPattern: "cypress/e2e/*.spec.js",
    experimentalRunAllSpecs: true,
  },
});
