//

module.exports = {
  bail: true,
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.spec.{ts,tsx}"],
  moduleDirectories: [".", "node_modules"],
  verbose: true
};
