module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "**/*Controller.ts",
    "**/*Repository.ts",
    "**/domain/**/*.ts",
    "!**/index.ts"
  ]
};