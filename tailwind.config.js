/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            height: {
                '1/20': '5%',
                '19/20': '95%'
            },
            colors: {
                corduroy: {
                    50: '#f6f7f6',
                    100: '#e2e5e2',
                    200: '#c5cac6',
                    300: '#a1a7a3',
                    400: '#7c857f',
                    500: '#626a65',
                    600: '#4d544f',
                    700: '#404542',
                    800: '#363937',
                    900: '#2f3230'
                },
                'chelsea-cucumber': {
                    50: '#f5f8ed',
                    100: '#e7efd8',
                    200: '#d2e1b5',
                    300: '#b3cc8a',
                    400: '#97b764',
                    500: '#7ea249',
                    600: '#5d7b35',
                    700: '#495f2c',
                    800: '#3c4d27',
                    900: '#354225'
                }
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')],
    variants: {
        extend: {
            display: ['group-hover']
        }
    }
};
