/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode using the class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all the files in src that use Tailwind
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#14171A",
      },
    },
  },
  plugins: [],
};
