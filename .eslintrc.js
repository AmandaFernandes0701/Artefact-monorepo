module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021, // Suporta recursos modernos do ECMAScript
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "prettier", "react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended", // Deve ficar por último para desativar regras conflitantes com o Prettier
    "next/core-web-vitals",
  ],
  rules: {
    // Garante que a formatação do Prettier seja respeitada
    "prettier/prettier": "error",
    // Desativa a necessidade de importar React em arquivos Next/React (a partir do Next 10 ou React 17+)
    "react/react-in-jsx-scope": "off",
    // Configuração para padronizar a ordem das importações
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["sibling", "parent"],
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    // Define tamanho máximo da linha, ignorando URLs e strings
    "max-len": [
      "error",
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", ".next/", "out/"],
};
