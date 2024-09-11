import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        goldTheme: {
          darkBrown: "#3e2723",
          gold1: "#795548",
          gold2: "#ffb300",
          lightGold: "#ffe082",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Universal Roboto font
      },
    },
  },
  plugins: [],
};
export default config;
