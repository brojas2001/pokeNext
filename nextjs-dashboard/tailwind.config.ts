import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        normal: '#A8A77A',
        fuego: '#EE8130',
        agua: '#6390F0',
        electrico: '#F7D02C',
        planta: '#7AC74C',
        hielo: '#96D9D6',
        lucha: '#C22E28',
        veneno: '#A33EA1',
        tierra: '#E2BF65',
        volador: '#A98FF3',
        psiquico: '#F95587',
        bicho: '#A6B91A',
        roca: '#B6A136',
        fantasma: '#735797',
        dragon: '#6F35FC',
        acero: '#B7B7CE',
        hada: '#D685AD',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
