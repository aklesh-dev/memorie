/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: "#3498db",
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.gradient-text': {
          background: 'linear-gradient(to right, #25d368, #23c671, #29b977, #34ac7a, #409e7b, #289985, #0e938e, #008c94, #0089b2, #0082d1, #0073e5, #6857e1)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    }
  ],
}