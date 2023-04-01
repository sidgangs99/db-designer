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
                slate: {
                    main: '#2B2539'
                },
                oatmeal: {
                    light: '#f7f6f5',
                    main: '#EBE9E4'
                },
                coral: {
                    lighter: '#fbf5f5',
                    light: '#f8e8e8',
                    main: '#EFC8C8',
                    dark: '#e9b8b8',
                    darker: '#db8e8e',
                    darkest: '#ca6969'
                },
                sea: {
                    light: '#e0ebe6',
                    main: '#BED3CC',
                    dark: '#9bbab2',
                    darker: '#6f988e',
                    darkest: '#4f7a71'
                },
                umber: {
                    lightest: '#fff0d5',
                    lighter: '#fdd79e',
                    light: '#fcc375',
                    main: '#f99e3e',
                    dark: '#f78118',
                    darker: '#e8670e'
                },
                chartreuse: {
                    lighter: '#fbfbef',
                    light: '#EEEFC8',
                    main: '#e2e4a3',
                    dark: '#d6d573',
                    darker: '#cdc752',
                    darkest: '#c3af3d'
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
