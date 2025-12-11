/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0f0d23',
        s_text: '#9ca4ab',
        t_text: '#a8b5db',
        ico_text: '#AB8BFF',
      }
    },
  },
  plugins: [],
}