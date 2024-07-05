/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "340px",
        md: "770px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        theme: {
          DEFAULT: "#201d56",
          50: "#6661CA",
          100: "#5852C5",
          200: "#423CB2",
          300: "#373293",
          400: "#2B2775",
          500: "#201D56",
          600: "#100F2C",
          700: "#010102",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        secondary: {
          DEFAULT: "#f49d0c",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde58a",
          300: "#fbd24e",
          400: "#fabe25",
          500: "#f49d0c",
          600: "#d87607",
          700: "#bc560a",
          800: "#923f0e",
          900: "#78340f",
          950: "#451a03",
        },
        themeBlue: "#201d56",
        themeGray: "#F4F4F5",
        facebook: "#3b5998",
        twitter: "#00acee",
        linkedin: "#0072b1",
        instagram: "#BD33B5",
        whatsapp: "#25d366",
        youtube: "#cd201f",
        pinterest: "#E60023",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-2deg)",
          },
          "50%": {
            transform: "rotate(2deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
