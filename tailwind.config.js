/** @type {import('tailwindcss').Config} */

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    safelist: [],
    theme: {
        extend: {
            colors: {
                'success': '#4CAF50',
                'error': '#F44336',
                'gray': '#212121',
                'green': '#3B755F',
                'light-green': '#AFC6BD',
                'blue': '#2E3A8C',
                'beige': '#F2EBDB',
                'white': '#FFFFFF',
            },
            screens: {
                'xs': '370px',
            },
        }
    },
}

