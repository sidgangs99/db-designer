/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['gilroy', 'Helvetica', 'Arial', 'sans-serif'],
                serif: ['gilroy', 'Helvetica', 'Arial', 'sans-serif']
            },
            height: {
                '5/100': '5%',
                '92/100': '92%',
                '3/100': '3%',
                '10/100': '10%',
                '90/100': '90%'
            },
            colors: {
                grey: {
                    lighter: '#9BA1A6',
                    light: '#697177',
                    main: '#4C5155',
                    dark: '#2B2F31',
                    darker: '#1A1D1E'
                },
                red: {
                    main: '#FF512E'
                },
                yellow: {
                    lighter: '#fbfbeb',
                    light: '#f5f6cb',
                    main: '#EEEE9B',
                    dark: '#e4df60',
                    darker: '#dacd35'
                },
                cyan: {
                    main: '#15F1CA'
                },
                orange: {
                    main: '#FF9900'
                },
                coral: {
                    lightest: '#ffe5d4',
                    lighter: '#ffc7a8',
                    light: '#ffa071',
                    main: '#ff7f50',
                    dark: '#fe4711'
                },
                blue: {
                    main: '#3FC5FF'
                },
                navy: {
                    main: '#2E4650'
                }
            },
            width: {
                88: '22rem',
                90: '22.5rem',
                95: '23.75rem'
            },
            zIndex: {
                100: '100',
                200: '200'
            },
            margin: {
                18: '4.5rem'
            }
        }
    },
    plugins: [],
    variants: {
        extend: {
            display: ['group-hover']
        }
    }
};
