module.exports = {
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/specs/**/*[.-][Ss]pec{,s}.{j}s"],
  rootDir: ".",
  verbose: false,
  resetMocks: true,
  resetModules: true,
  collectCoverageFrom: [
    "src/*.js",
    "!**/*.min.js",
    "!**/static/**",
    "!**/specs/**",
    "!**/node_modules/**"
  ]
};
