/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter"', 'sans-serif']
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gray: "#EEF2ED",
        graysubtitle: "#5E5E5E", 
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
