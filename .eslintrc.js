/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@getoptimal/eslint-config"], // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./apps/*/tsconfig.json",
      "./libs/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  settings: {},
};

module.exports = config;
