/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  overrides: [
    {
      // Apply rules only to files inside the `src` folder and its subfolders
      files: ["src/**/*.{js,jsx,ts,tsx}"],
      // Add or modify rules specific to the `src` folder
      rules: {
        // Your rules specific to the `src` folder
        "quotes": ["error", "single", { avoidEscape: true }],
        "jsx-quotes": ["error", "prefer-single"] // Enforce single quotes for JSX attributes
      },
    }
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: { attributes: false },
      },
    ],
    "react/jsx-curly-spacing": [
      "error",
      {
        when: "always", // Require spaces inside curly braces in JSX attributes
        children: true,
        spacing: {
          objectLiterals: "never", // Disallow spaces inside of JSX curly braces in object literals
        },
      },
    ],
    "react/jsx-props-no-multi-spaces": ["error"], // Disallow multiple spaces between JSX attributes
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never", // Disallow spaces before closing slash in JSX
        beforeSelfClosing: "allow", // allow spaces before closing bracket in self-closing JSX
        afterOpening: "never", // Disallow spaces after opening bracket in JSX
        beforeClosing: "never", // Disallow spaces before closing bracket in JSX
      },
    ],
    "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
  },
};

module.exports = config;
