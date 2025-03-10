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
      },
    },
  },
  plugins: [],
} satisfies Config;
