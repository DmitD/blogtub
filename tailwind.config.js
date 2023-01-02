/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				josefin: ['Josefin Sans', 'sans-serif'],
			},
			colors: {
				theme: {
					blue: '#4b4870',
				},
			},
			spacing: {
				navItem: '0.425rem',
			},
		},
	},
	plugins: [],
}
