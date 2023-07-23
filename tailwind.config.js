/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        duck: "url('/brand/duck.png')",
        "dot-pattern": "url('/pattern/dotted/lightAlt.svg')",
      },
    },
  },
  plugins: [],
}
