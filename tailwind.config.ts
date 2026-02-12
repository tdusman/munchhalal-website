import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          dark: '#EA6C0A',
        },
        bg: '#09090B',
        surface: '#111113',
        surface2: '#18181B',
        border: '#27272A',
        text: '#FAFAFA',
        muted: '#A1A1AA',
        green: '#22C55E',
        gold: '#F59E0B',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.6s ease-out 0.1s forwards',
        'fade-up-delay-2': 'fade-up 0.6s ease-out 0.2s forwards',
        'fade-up-delay-3': 'fade-up 0.6s ease-out 0.3s forwards',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
