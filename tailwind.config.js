const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        box: "url('/images/box.svg')",
        box_highlight: "url('/images/box-highlight.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
