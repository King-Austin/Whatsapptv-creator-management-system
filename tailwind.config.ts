import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DC2626", // Bold Red
          hover: "#B91C1C",
          light: "#FEE2E2",
          dark: "#991B1B",
        },
        accent: {
          DEFAULT: "#111827", // Dark Slate for contrast
          light: "#374151",
          dark: "#030712",
        },
        background: "#FFFFFF",
        foreground: "#0F172A",
        muted: "#F8FAFC",
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "var(--font-outfit)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
