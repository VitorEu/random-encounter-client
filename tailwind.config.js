/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./public/*.{png,jpg,svg}"
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      lich: "url('https://i.imgur.com/RE6EVpc.png')",
      tasha: "url('https://images.ctfassets.net/swt2dsco9mfe/3lwEFqFyhil8tJ3FzGFRrR/5286da6768e05ecee6ade0d0486cd366/TCoE_1920x1080_Wallpaper.jpeg')",
      forest: "url('../../public/forest.png')",
      giant: "url('https://images.ctfassets.net/swt2dsco9mfe/4ESOCp8aYFNJkSY5BG5yag/4799a4fe39a964459a7ad7031687ac0c/Volo_1920x1080_New_Wallpaper.jpeg')",
      "giant-dark": "url('../../public/giant-dark.png')",
      "mt-pump": "url('../../public/mt-pump.svg')",
      "mt-pump2": "url('../../public/mt-pump2.svg')",
    },
    backgroundPosition: {
      c1: "-900px top"
    }
  },
};
export const plugins = [];
