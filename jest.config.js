module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*Controller.ts",
    "**/*Repository.ts",
    "**/domain/**/*.ts",
    "!**/index.ts"
  ],
  coverageThreshold: {
    "global": {
      "branches": 60,
      "functions": 60,
      "lines": 60,
      "statements": 60
    }
  }
};