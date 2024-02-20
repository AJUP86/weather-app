/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#264653',
        secondary: '#2a9d8f',
        accent: '#e76f51',
        background: '#f1faee',
        surface: '#f4f4f4',
        onPrimary: '#ffffff',
        onSecondary: '#ffffff',
        onBackground: '#333333',
        onError: '#ffffff',
        error: '#e63946',
        success: '#2a9d8f',
        info: '#457b9d',
        warning: '#e9c46a',
        onLight: '#333333',
        onDark: '#ffffff'
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(120deg, #264653 0%, #2a9d8f 100%)',
        'secondary-gradient': 'linear-gradient(120deg, #2a9d8f 0%, #e76f51 100%)',
        'accent-gradient': 'linear-gradient(120deg, #e76f51 0%, #f4a261 100%)',
        'error-gradient': 'linear-gradient(120deg, #e63946 0%, #f1faee 100%)'
      }
    }
  },
  plugins: []
};
