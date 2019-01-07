//

module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  transformIgnorePatterns: ["node_modules/(?!ramda)"],
  globals: {
    "ts-jest": {
      tsConfig: {
        strict: false,
        allowJs: true
      }
    }
  }
};
