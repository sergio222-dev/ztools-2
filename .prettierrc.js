// Documentation for this file: https://prettier.io/en/configuration.html
module.exports = {
  // We use a larger print width because Prettier's word-wrapping seems to be tuned
  // for plain JavaScript without type annotations
  printWidth: 110,

  // Use .gitattributes to manage newlines
  endOfLine: 'auto',

  // Use single quotes instead of double quotes
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  semi: true,
  trailingComma: 'all',
  jsxSingleQuote: false,
};
