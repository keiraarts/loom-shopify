module.exports = {
  extends: [
    "plugin:shopify/react",
    "plugin:shopify/polaris",
    "plugin:shopify/jest",
    "plugin:shopify/webpack",
  ],
  rules: {
    "import/no-unresolved": "off",
    "jest/no-test-callback": "off",
    "react/react-in-jsx-scope": "off",
    "shopify/jsx-prefer-fragment-wrappers": "off",
    "react/no-unescaped-entities": "off",
  },
  overrides: [
    {
      files: ["*.test.*"],
      rules: {
        "shopify/jsx-no-hardcoded-content": "off",
      },
    },
  ],
};
