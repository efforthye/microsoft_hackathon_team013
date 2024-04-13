module.exports = {
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 120,
  arrowParens: "always",
  bracketSpacing: true,
  singleQuote: true,
  jsxSingleQuote: true,
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      options: {
        parser: "typescript",
      },
    },
  ],
};
