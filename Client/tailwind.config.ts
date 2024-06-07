import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1550px",
      x2l: "1700px",
    },
    extend: {
      colors: {
        dark: "#1c1c1c",
        text: "white",
        blue: "#00ccff",
        pink: "#1DB954",
      },
    },
  },
  plugins: [],
};
export default config;
