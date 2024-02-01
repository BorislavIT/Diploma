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
      xl: "1540px",
    },
    extend: {
      colors: {
        theme: {
          primary: "var(--theme-primary-color)",
          secondary: "var(--theme-secondary-color)",
          text: "var(--theme-text-color)",
          border: "var(--theme-border-color)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
