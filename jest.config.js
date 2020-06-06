module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*Router.ts",
    "**/*RouterFactory.ts",
    "**/*Controller.ts",
    "**/*ControllerFactory.ts",
    "**/*Repository.ts",
    "**/*RepositoryFactory.ts",
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