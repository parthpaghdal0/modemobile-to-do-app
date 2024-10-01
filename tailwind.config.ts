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
        primary: "#fd007c",
        secondary: "#3f3f46",
      },
      backgroundImage: {
        primaryLinear: "linear-gradient(250deg, #fd007c, #ff683b);",
        secondaryLinear: "linear-gradient(108deg, #fd007c, #ff683b)",
      }
    },
  },
  plugins: [],
};
export default config;
