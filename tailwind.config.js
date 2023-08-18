/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {      
      colors: {
      'primary': '#ED1C24',
      'secondary': '#1C75BC',
    }},
  },
  plugins: [],
}

