/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // or'media' or 'class'
  content: [
    "./public/**/*.html",
    "./public/**/*.css",
    "./public/**/*.js",
    './src/js/**/*.js',
    "./public/**/*.ts",
    './src/js/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f6efd7",
          200: "#eedfaf",
          300: "#e5cf87",
          400: "#ddbf5f",
          500: "#d4af37",
          600: "#aa8c2c",
          700: "#7f6921",
          800: "#554616",
          900: "#2a230b"
        },
        secondary: {
          100: "#d1d1d1",
          200: "#a3a3a3",
          300: "#757575",
          400: "#474747",
          500: "#191919",
          600: "#141414",
          700: "#0f0f0f",
          800: "#0a0a0a",
          900: "#050505"
        },
        tertiary: {
          100: "#d9d7dd",
          200: "#b3afbb",
          300: "#8d889a",
          400: "#676078",
          500: "#413856",
          600: "#342d45",
          700: "#272234",
          800: "#1a1622",
          900: "#0d0b11"
        },
        positive: "#03CEA4",
        negative: "#B00020",
      },

      fontFamily: {
        "body": ["Roboto"], //'open-sans'],
        "heading": ["Lora"], //"sans-serif"],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ],
}