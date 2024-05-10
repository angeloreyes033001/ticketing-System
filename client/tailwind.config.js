/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'custom-orange': '#FFBE78',
        'custom-blue': '#42A8D8',
        'custom-green': '#33D29D',
        'custom-green-v2': '#5FA29F',
        'custom-violet': '#9747FF'
      }
    },
  },
  plugins: [],
}

