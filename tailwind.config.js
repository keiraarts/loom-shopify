// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  // mode: "jit",
  important: true,
  purge: {
    content: [
      "./pages/**/*.html",
      "./pages/**/*.tsx",
      "./pages/**/*.js",
      "./src/**/*.html",
      "./src/**/*.js",
      "./components/**/*.html",
      "./components/**/*.tsx",
      "./components/**/*.js",
      "./common/**/*.html",
      "./common/**/*.tsx",
      "./common/**/*.js",
    ],
  },

  variants: {
    extend: {
      scale: ["active", "group-hover"],
    },
  },

  theme: {
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
    },

    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        orange: colors.orange,

        shopify: {
          icon: `#5D5F62`,
          grey: "#F6F6F7",
          shade: "#EDEEEF",
          green: "#008060",
          border: "#E0E3E5",
        },

        brand: {
          beige: "#EFEDE6",
          paper: "#FFF3E4",
          lilac: "#C7B9FF",
          yellow: "#FFBB24",
          background: "#0033CC",
          red: "#E9453C",
          green: "#B6D827",
          blue: "#5551FF",
          grey: "#5B6B72",
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
