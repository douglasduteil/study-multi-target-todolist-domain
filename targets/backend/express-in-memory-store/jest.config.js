//

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleDirectories: ["node_modules", "."]
};
