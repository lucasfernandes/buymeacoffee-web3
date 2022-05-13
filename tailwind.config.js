module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        box: "url('/images/box.svg')",
        box_highlight: "url('/images/box-highlight.svg')",
      },
    },
  },
  plugins: [],
};
