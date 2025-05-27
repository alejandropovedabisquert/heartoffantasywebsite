import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Centra automáticamente el container
        padding: "2rem", // Ajusta el padding interno
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1000px",
          "2xl": "1200px",
        },
      },
      gridTemplateColumns: {
        title: '1fr auto 1fr',
        'left-side': '.1fr auto 1fr',
        'right-side': '1fr auto .1fr'
      },
      gridTemplateRows: {
        title: '22px 0'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        corporative: "#A43046",
      },
      keyframes: {
        wiggle:{
          '0%, 7%': {transform: 'rotateZ(0)'},
          '15%': {transform: 'rotateZ(-15deg)'},
          '20%': {transform: 'rotateZ(10deg)'},
          '25%': {transform: 'rotateZ(-10deg)'},
          '30%': {transform: 'rotateZ(6deg)'},
          '35%': {transform: 'rotateZ(-4deg)'},
          '40%, 100%': {transform: 'rotateZ(-0)'},
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-up-less': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        'float-inner-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(1px)' },
        },
        'float-left': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
        },
        'float-inner-left': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-1px)' },
        },
        'float-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        'float-inner-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(1px)' },
        },
        'float-up-left': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-15px, -15px)' },
        },
        'float-inner-up-left': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-1px, -1px)' },
        },
        'float-up-right': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, -15px)' },
        },
        'float-inner-up-right': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(1px, -1px)' },
        },
        'float-down-left': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-15px, 15px)' },
        },
        'float-inner-down-left': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-1px, 1px)' },
        },
        'float-down-right': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, 15px)' },
        },
      },
      animation: {
        'wiggle': 'wiggle 1s linear infinite',
        'float-up': 'float-up 4s ease-in-out infinite',
        'float-up-less': 'float-up 4s ease-in-out infinite',
        'float-down': 'float-down 4s ease-in-out infinite',
        'float-inner-down': 'float-inner-down 4s ease-in-out infinite',
        'float-left': 'float-left 4s ease-in-out infinite',
        'float-inner-left': 'float-inner-left 4s ease-in-out infinite',
        'float-right': 'float-right 4s ease-in-out infinite',
        'float-inner-right': 'float-inner-right 4s ease-in-out infinite',
        'float-up-left': 'float-up-left 4s ease-in-out infinite',
        'float-inner-up-left': 'float-inner-up-left 4s ease-in-out infinite',
        'float-up-right': 'float-up-right 4s ease-in-out infinite',
        'float-inner-up-right': 'float-inner-up-right 4s ease-in-out infinite',
        'float-down-left': 'float-down-left 4s ease-in-out infinite',
        'float-inner-down-left': 'float-inner-down-left 4s ease-in-out infinite',
        'float-down-right': 'float-down-right 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
