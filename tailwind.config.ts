import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#D1D7DC',
        'text-secondary': '#2C2F31',
        'grad-from': '#F8E1AC',
        'grad-via': '#F6D9BE',
        'grad-to': '#F6CFCD',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      zIndex: {
        'header': '150',
        'swiper': '250',
      },
    },
  },
  plugins: [],
} satisfies Config
