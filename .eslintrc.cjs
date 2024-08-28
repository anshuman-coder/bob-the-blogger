/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  overrides: [
    {
      // Apply rules only to files inside the `src` folder and its subfolders
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      // Add or modify rules specific to the `src` folder
      rules: {
        // Your rules specific to the `src` folder
        'quotes': ['error', 'single', { avoidEscape: true }],
        'jsx-quotes': ['error', 'prefer-single'], // Enforce single quotes for JSX attributes
      },
    },
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'no-empty-pattern': 'off',

    'tailwindcss/enforces-negative-arbitrary-values': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',

    'react-hooks/rules-of-hooks': 'error', // Ensure hooks are used correctly
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle', // Allow handle* for event handlers
        eventHandlerPropPrefix: 'on', // Allow on* for event handler props
      },
    ],

    'react-hooks/exhaustive-deps': 'warn',

    // FUTURE PHASE 2 BELOW
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    // FUTURE PHASE 2 ABOVE

    // from turbo repo
    '@next/next/no-html-link-for-pages': 'off',

    'react/destructuring-assignment': [1, 'always', {
      'destructureInSignature': 'always',
    }],

    'no-void': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/padding-line-between-statements': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/prefer-enum-initializers': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-implicit-any-catch': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/no-restricted-imports': 'off',
    'react/no-did-update-set-state': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-is-mounted': 'off',
    'react/no-redundant-should-component-update': 'off',
    'react/no-render-return-value': 'off',
    'react/no-string-refs': 'off',
    'react/no-this-in-sfc': 'off',
    'react/no-will-update-set-state': 'off',
    'react/prefer-es6-class': 'off',
    'react/no-unused-state': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/require-render-return': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'error',
    'react/boolean-prop-naming': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'react/no-unstable-nested-components': [
      'warn',
      {
        'allowAsProps': true,
      },
    ],
    'react/jsx-key': 'warn',
    'react/jsx-no-bind': [
      'error',
      {
        'ignoreRefs': false,
        'allowArrowFunctions': true,
        'allowFunctions': true,
        'allowBind': false,
        'ignoreDOMComponents': false,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-script-url': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-no-literals': 'off',
    'for-direction': 'off',
    'no-await-in-loop': 'off',
    'no-debugger': 'warn',
    'no-sparse-arrays': 'off',
    'no-unreachable': 'warn',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'consistent-return': 'off',
    'no-console': [
      'warn',
      {
        'allow': ['error', 'warn', 'info', 'time', 'timeEnd', 'timeLog', 'trace', 'debug', 'log'],
      },
    ],
    'no-empty': 'warn',
    'no-eval': 'error',
    'no-extra-semi': 'error',
    'no-lonely-if': 'off',
    'no-return-await': 'warn',
    'no-ternary': 'off',
    'no-nested-ternary': 'off',
    'no-useless-call': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    'arrow-body-style': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-imports': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/prefer-as-const': 'off',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      },
    ],
    'no-tabs': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-trailing-spaces': 'warn',
    'jsx-quotes': ['error', 'prefer-single'],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'arrow-parens': ['off'],
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true,
      },
    ],
    'brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': true,
      },
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true,
      },
    ],
    'semi': ['error', 'never'],
    'quotes': [
      'error',
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true,
      },
    ],
    'object-property-newline': [
      'error',
      {
        'allowAllPropertiesOnSameLine': true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        'consistent': true,
        'multiline': true,
      },
    ],
  },
}

module.exports = config
