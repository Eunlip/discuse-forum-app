/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        leaves: "url('./assets/images/blue-snow.png')",
      },
    },
    colors: {
      yankeesBlue: '#272343',
      outerSpace: '#2D334A',
      jacarta: '#322E4C',
      mustardYellow: '#DAB903',
      bussYellow: '#FFD803',
      sonicSilver: '#7A7A7A',
      chineseWhite: '#E0E0E0',
      aliceBlue: '#F0F3FF',
      white: '#FEFEFF',
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
});
