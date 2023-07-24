/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        lich: "url('https://i.imgur.com/RE6EVpc.png')", 
        tasha: "url('https://images.ctfassets.net/swt2dsco9mfe/3lwEFqFyhil8tJ3FzGFRrR/5286da6768e05ecee6ade0d0486cd366/TCoE_1920x1080_Wallpaper.jpeg')",
        forest: "url('https://i.imgur.com/cz9rSni.png')",
      },
      backgroundPosition: {
        c1: "-900px top"
      }
    },
  },
  plugins: [],
};
