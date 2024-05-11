/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ["./src/**/*.{html,js}", "**/*.php", "./src/**/*.{html,js}", "**/*.html"],

  theme: {
    extend: {
      colors: {
        // you can either spread `colors` to apply all the colors
        ...colors,

      }
    }
  },
  plugins: [],
}

