/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gym: {
                    black: '#0a0a0a',
                    dark: '#1a1a1a',
                    gray: '#2d2d2d',
                    orange: '#ff4d00', // Vibrant orange
                    orangeHover: '#e64500',
                    white: '#ffffff',
                    lightGray: '#a0a0a0',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // We will import Inter in index.css
                heading: ['Outfit', 'sans-serif'], // Bold headings
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(to right bottom, #0a0a0a, #1a1a1a, #0a0a0a)',
                'glass': 'rgba(255, 255, 255, 0.05)',
            },
            boxShadow: {
                'neon': '0 0 20px rgba(255, 77, 0, 0.5)',
            }
        },
    },
    plugins: [],
}
