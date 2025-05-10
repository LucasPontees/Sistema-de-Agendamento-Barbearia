// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#ff69b4',
                }, secondary: '#00b37e',
                'cash-dark': '#0d0f10',
                'cash-green': '#00FF00',
            },
        },
    },
    plugins: [],
}
