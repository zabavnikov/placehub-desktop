/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'components/**/*.{ts,vue}',
    'layouts/**/*.{ts,vue}',
    'pages/**/*.vue',
  ],
  theme: {
    extend: {
      fontWeight: {
        semibold: 500,
      },
      fontSize: {
        base: '0.875rem',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
