import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["app/**/*.{ts,tsx,js,jsx}", "components/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "indent": ["error", 2],
      "key-spacing": [
        "error",
        {
          beforeColon: false,
          afterColon: true,
          align: "value",
        },
      ],
      "comma-spacing": ["error", { before: false, after: true }],
      "space-in-parens": ["error", "never"],
      "array-bracket-spacing": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "no-mixed-spaces-and-tabs": "error",
      "function-paren-newline": ["error", "multiline"],
      "arrow-spacing": ["error", { before: true, after: true }],
    },
  },
];

export default eslintConfig;
