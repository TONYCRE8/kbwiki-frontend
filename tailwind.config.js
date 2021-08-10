module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'nunito-black': ['nunito-black', 'sans-serif'],
        'inter-semibold': ['inter-semibold', 'sans-serif'],
        'inter-regular': ['inter-regular', 'sans-serif'],
        'inter-thin': ['inter-thin', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
