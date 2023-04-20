/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins:{
    preflight: false
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

