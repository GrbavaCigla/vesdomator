/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-svelte"],
};

module.exports = config;
