/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				darkest: '#212233', // almost black
				darker: '#232941', // dark blue "whale blue"
				dark: '#295651', // greenish blue "deep pine"
				middle: '#6C9D80', // light a bit darker
				light: '#f8fdd7', // very light greenish yellow
				lightgray: '#f1f5f9', // slate 100
				middlegray: '#64748b', // slate 500 - passes 3 : 1 with white and darker
				darkgray: '#475569', // slate 600
			},
			transitionProperty: {
			  widen: 'letter-spacing, font-weight',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
}
