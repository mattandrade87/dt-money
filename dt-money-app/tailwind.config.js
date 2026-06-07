const { colors } = require('./src/shared/colors')

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  safelist: ['bg-background-tertiary', 'bg-accent-brand-background-primary'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      height: {
        button: 57,
      },
      borderRadius: {
        6: '6px',
      },
      colors,
    },
  },
  plugins: [],
}
