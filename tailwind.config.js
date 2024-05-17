/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "@/app/components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      textColor: {
        primary: "var(--gray-12)",
        secondary: "var(--gray-11)",
        tertiary: "var(--gray-9)",
        link: "var(--blue-11)",
      },
      backgroundColor: {
        contrast: "var(--contrast-color)",
        primary: "var(--gray-1)",
        secondary: "var(--gray-2)",
        tertiary: "var(--gray-3)",
      },
      borderColor: {
        primary: "var(--gray-6)",
        secondary: "var(--gray-3)",
      },
      divideColor: {
        primary: "var(--gray-6)",
        secondary: "var(--gray-3)",
      },
      ringOffsetColor: {
        primary: "var(--gray-12)",
      },
      boxShadow: {
        soft: "0 15px 30px 0 rgba(0, 0, 0, 0.04)",
      },
      keyframes: {
        in: {
          "0%": { transform: "translateY(18px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "in-reverse": {
          "0%": { transform: "translateY(-18px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
      },
      animation: {
        in: "in .6s both",
        "in-reverse": "in-reverse .6s both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
