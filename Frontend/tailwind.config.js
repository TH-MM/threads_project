/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        '200': '90vh',
        'fw' : '460px',
        'fp' : '30px',
      }
    },
  },
  plugins: [],
}

