/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          primary: '#007BFF',
          light: '#59CBE8'
        },
        sun: '#FFD700',
        storm: '#6C757D',
        rain: '#325C74',
        sunset: '#FFA07A',
        night: '#34495E',
        cloud: '#ECF0F1',
        danger: '#DC3545'
      }
    }
  },
  plugins: []
};
