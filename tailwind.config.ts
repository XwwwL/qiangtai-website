import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#071B33",
          800: "#0A2540",
          700: "#0D2F52",
        },
        industrial: {
          600: "#0B4F8A",
          500: "#0D5FA0",
        },
        tech: {
          500: "#087EA4",
        },
        teal: {
          600: "#00A896",
          500: "#18C7B7",
          50: "#EAF8F6",
        },
        page: {
          bg: "#F8FBFC",
        },
        text: {
          body: "#233142",
          muted: "#5A6D80",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
