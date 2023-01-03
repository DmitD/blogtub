/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				josefin: ['Josefin Sans', 'sans-serif'],
			},
			fontSize: {
				banner: '3.5rem',
			},
			colors: {
				theme: {
					blue: '#4b4870',
				},
			},
			spacing: {
				navItem: '0.425rem',
			},
			boxShadow: {
				banner:
					'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%)',
			},
			dropShadow: {
				banner: '0px 1px 3px rgb(0 0 0 / 30%)',
			},
		},
	},
	plugins: [],
}
