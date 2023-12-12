/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'btn-grey': '#818384',
				'board-grey': '#3a3a3d',
				'base-black': '#121214'
			}
		}
	},
	plugins: []
};
