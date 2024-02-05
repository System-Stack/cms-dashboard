/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: '#295651', // greenish blue "deep pine"
        darker: '#232941', // dark blue "whale blue"
        light: '#97BAA4', // pale green "summer green"
        lighter: '#f8fdd7', // very light greenish yellow
        middle: '#6C9D80', // light a bit darker
        darkgray: '#475569', // slate 600
        darkergray: '#334155', // slate 700
        lightgray: '#f1f5f9', // slate 100
        // custom colors: https://www.shutterstock.com/blog/101-color-combinations-design-inspiration#21-sea-green
        /**
         * WCAG contrasts:
         * "summer green" : white - fail
         * "summer green" : "whale blue" - pass
         * "summer green" : darkergray - pass
         * middle : white : small text fail, large text pass (18px bold or 24px)
         * middle : "whale blue" : pass
         * red 400 : "whale blue" - pass
         * red 400 : white - fail
         * red 700 : white - pass
         */
      },
      screens: {
        xs: '360px',
        '3xl': '1792px',
      },
      transitionProperty: {
        widen: 'letter-spacing, font-weight',
      },
      textShadow: {
        DEFAULT: '0 2px 4px rgb(0 0 0 / 0.5)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ matchUtilities, theme}) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
  darkMode: 'class',
};
