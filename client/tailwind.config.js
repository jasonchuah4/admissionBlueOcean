/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "galv-orange": "#ff6900",
        "galv-blue": "#0000ee",
        bg: "#0A0B0B",
        secondary: "#1A1A1A",
        text: "#333333",
        "text-gray": "#666666",
        "text-light-gray": "#999999",
        "text-white": "#ffffff",
        "text-black": "#000000",
        accent: "#34a1e0",
      },
      screens: {
        custom: "2014px",
      },
    },
  },
  plugins: [],
};
