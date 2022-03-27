module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {
		backgroundImage: {
		  'parchment': "url('/images/bg.jpg')",
		}
	  }
  },
  plugins: [],
}
