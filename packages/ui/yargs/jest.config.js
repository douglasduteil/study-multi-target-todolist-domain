//

module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  preset: "ts-jest/presets/js-with-ts",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
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
