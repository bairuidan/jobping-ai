import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f7f7f5',
        card: '#ffffff',
        text: '#1f2937',
      },
    },
  },
  plugins: [],
};

export default config;
