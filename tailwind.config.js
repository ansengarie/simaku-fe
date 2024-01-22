/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite/**/*.{js,ts}',
  ],
  theme: {
    fontFamily: {
      poppins: 'Poppins, sans-serif',
    },
    extend: {
      colors: {
        primary: '#4640DE',
        secondary: '#F6F6FD',
        grey: '#ABB3C4',
        dark: '#121F3E',
        page: '#F8F8FA',
        success: '#2ED16C',
        navy: '#121F3E',
        background: '#F8F8FA',
        disabled: '#D9D9D9',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
