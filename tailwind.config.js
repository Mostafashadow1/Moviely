/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        mainColor: "#fff",
        secColor: "rgb(221 221 221 / 70%)",
        redColor: "#E50914",
      },
      backgroundColor: {
        mainColor: "#111418",
        secColor: "#0f141a",
        layout: "#000000ab",
        redColor: "#E50914",
      },
     
      borderColor: {
        mainColor: "#ffffff1a",
      },
    },
  },
  plugins: [],
};
