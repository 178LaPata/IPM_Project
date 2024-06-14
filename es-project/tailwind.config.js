/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}", "/index.html"],
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      colors: {
        primary: "#006989",
        secondary: "#EAEBED"
      },
    },
  },
  plugins: [],
};
