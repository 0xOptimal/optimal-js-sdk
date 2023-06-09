/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "@react-native-community",
    "turbo",
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "import/no-anonymous-default-export": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
  ignorePatterns: ["**/*.config.js", "**/*.config.cjs", "packages/config/**"],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
