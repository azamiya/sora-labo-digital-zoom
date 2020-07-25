module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  plugins: ["react", "prettier"],
  globals: {
    document: true,
    navigator: true,
    window: true,
    fetch: true,
    alert: true,
    localStorage: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
};
