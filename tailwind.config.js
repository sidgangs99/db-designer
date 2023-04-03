/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            height: {
                '5/100': '5%',
                '92/100': '92%',
                '3/100': '3%'
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
                    main: '#FFE100'
                },
                cyan: {
                    main: '#15F1CA'
                },
                coral: {
                    main: '#ff7f50'
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
