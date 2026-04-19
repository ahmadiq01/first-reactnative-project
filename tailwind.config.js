// tailwind.config.js — aligned with North Star / again theme
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F1FB',
          100: '#B5D4F4',
          400: '#378ADD',
          600: '#185FA5',
          800: '#0C447C',
        },
        brand: '#185FA5',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui'],
      },
    },
  },
  plugins: [],
};
