/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50', // Dark shade of blue
        secondary: '#8E44AD', // Shade of purple
        light: '#e1a4e3', // Light purple
        background: '#f0ffff', // Off-white background
        text: '#333333', // Primary text color
        accent: '#3498db', // Bright accent color
        error: '#e74c3c', // Error color
        success: '#2ecc71', // Success color
        info: '#3498db', // Information color
        warning: '#f1c40f', // Warning color
        lightGray: '#ecf0f1', // Light gray
        darkGray: '#95a5a6', // Dark gray
        border: '#dcdde1' // Border color
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--color-background), var(--color-light))'
      }
    }
  },
  plugins: []
};
