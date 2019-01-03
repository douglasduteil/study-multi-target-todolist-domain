//

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  modulePathIgnorePatterns: ["<rootDir>/src/bin"], // covered in integration tests
  collectCoverageFrom: ["**/src/**/*.{ts,tsx}"],
  moduleDirectories: [".", "node_modules"]
};
