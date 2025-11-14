/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './app/routes/**/*.{js,jsx,ts,tsx}',
    './app/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626', // Red color for buttons
          hover: '#b91c1c',
        },
      },
      backgroundColor: {
        'primary-hover': '#b91c1c',
      },
    },
  },
  plugins: [],
};

