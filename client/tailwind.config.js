/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			container: {
				padding: '2.5rem',
			},
			fontFamily: {
				josefin: ['Josefin Sans', 'sans-serif'],
			},
			fontSize: {
				banner: '3.5rem',
				article: '2.375rem',
				data: '0.938rem',
				pg: '1.063rem',
			},
			lineHeight: {
				loose: '1.15',
				pg: '1.8',
			},
			colors: {
				theme: {
					blue: '#4b4870',
					green: '#00d082',
				},
				article: {
					gray: '#596172',
				},
			},
			spacing: {
				navItem: '0.425rem',
				artBottom: '4.375rem',
			},
			boxShadow: {
				banner:
					'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%)',
				author: '0px 3px 5px -1px rgb(7 10 25 / 20%)',
				tag: '0px 2px 6px rgb(7 10 25 / 10%)',
			},
			dropShadow: {
				banner: '0px 1px 3px rgb(0 0 0 / 30%)',
				article: '0 3px 5px -2px rgb(7 10 25 / 20%)',
			},
		},
	},
	plugins: [],
}
