/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--gray12)",
        secondary: "var(--gray11)",
        tertiary: "var(--gray9)",
        brand: "var(--brand)",
      },
      backgroundColor: {
        primary: "var(--gray1)",
        secondary: "var(--gray4)",
        secondaryA: "var(--grayA4)",
        tertiary: "var(--gray3)",
        blur: "var(--blurBackground)",
        header: "var(--headerBackground)",
      },
      borderColor: {
        primary: "var(--gray6)",
        secondary: "var(--gray4)",
      },
      ringOffsetColor: {
        primary: "var(--gray12)",
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
    require('@tailwindcss/line-clamp'),
  ],
};
