/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary': '#AD8B73',
        'blood' : '#8a0303',
      }
    },

  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}