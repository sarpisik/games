const defaultRules = [
    'react-app',
    'eslint:recommended',
    // any other plugins or custom configuration you'd like to extend from.
];

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    extends: defaultRules,
    rules: {
        'array-callback-return': 'warn',
        'consistent-return': 'warn',
        'default-case': 'warn',
        'prettier/prettier': ['error'],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
        // etc.
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
            extends: [
                ...defaultRules,
                "prettier/@typescript-eslint",
                "plugin:prettier/recommended"
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-unused-expressions': 'warn',
                // etc.
            },
        },
    ],
    settings: {
        react: {
            // React version. "detect" automatically picks the version you have installed.
            version: 'detect',
        },
    },
};
