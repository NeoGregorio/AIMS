/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        purple: {
          light: "#9790FF",
          DEFAULT: "#6C63FF",
          dark: "#6661BF"
        },
        btn: {
          background: "#6C63FF",
          "background-hover": "#6661BF",
        },
      },
    },
  },
  plugins: [],
};
