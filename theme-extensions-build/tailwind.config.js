const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: [
      "./layout/*.liquid",
      "./templates/*.liquid",
      "./sections/*.liquid",
      "./snippets/*.liquid",
      "./blocks/*.liquid",
      "./**/*.liquid",
    ],
    safelist: [
      "ml-0",
      "mr-0",
      "mx-auto",
      "text-left",
      "text-right",
      "text-center",
    ],
  },
  theme: {
    extend: {
      colors: {
        grape: colors.purple,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
