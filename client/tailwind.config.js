/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#3630ce',
                custom: {
                    green: '#41B06E',
                    red: '#EE2B47',
                    yellow: '#f9bf3d',
                    blue: '#2f7cfc',
                },
                p: {
                    100: '#ddd9ef',
                    200: '#8e8eba',
                },
                container: {
                    light: '#fff',
                    dark: '#201f2d',
                },
                main: {
                    light: '#edf4fa',
                    dark: '#191825',
                },
            },
            textColor: {
                primary: '#5d53fc',
                custom: {
                    green: '#41B06E',
                    red: '#EE2B47',
                    yellow: '#f9bf3d',
                    blue: '#2f7cfc',
                },
                p: {
                    100: '#ddd9ef',
                    200: '#8e8eba',
                },
            },
            backgroundColor: {
                container: {
                    light: '#fff',
                    dark: '#201f2d',
                },
                main: {
                    light: '#edf4fa',
                    dark: '#191825',
                },
            },
        },
    },
    plugins: [],
};
