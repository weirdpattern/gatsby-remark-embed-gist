const prettier = require("./prettier.config");

module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "jest", "json", "prettier", "filenames"],
  env: {
    es6: true,
    node: true,
    jest: true
  },
  rules: {
    "semi": "error",
    "require-jsdoc": "error",
    "valid-jsdoc": [
      "error",
      {
        preferType: {
          any: "*",
          Boolean: "boolean",
          Number: "number",
          Object: "object",
          String: "string",
          return: "returns"
        },
        requireReturnType: true,
        requireParamDescription: true,
        requireReturnDescription: true
      }
    ],
    "quotes": [
      "error",
      "double",
      {
        avoidEscape: true
      }
    ],
    "filenames/no-index": "off",
    "filenames/match-exported": ["error", [null, "kebab", "camel"]],
    "prettier/prettier": ["error", prettier]
  }
};
