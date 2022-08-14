/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3991AC",
        secondary: "#338199",
        tertiary: "#6EE5FF"
      },
      width: {
        containerSmall:"40rem",
        container:"60rem",
      },
      height: {
        container:"6rem"
      } 
    },
  },
  plugins: [],
};
