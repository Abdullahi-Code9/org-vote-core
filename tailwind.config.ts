import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          DEFAULT: "#14b6e7",
          dark: "#0c9ec9",
          muted: "#e8f7fc",
        },
      },
    },
  },
  plugins: [],
};

export default config;
