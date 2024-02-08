/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
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
      textColor: {
        primary: "var(--slate-12)",
        secondary: "var(--slate-11)",
        tertiary: "var(--slate-9)",
        brand: "var(--brand)",
      },
      backgroundColor: {
        primary: "var(--slate-1)",
        secondary: "var(--slate-4)",
        secondaryA: "var(--slate-a4)",
        tertiary: "var(--slate-3)",
      },
      borderColor: {
        primary: "var(--slate-6)",
        secondary: "var(--slate-4)",
      },
      ringOffsetColor: {
        primary: "var(--slate-12)",
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
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
