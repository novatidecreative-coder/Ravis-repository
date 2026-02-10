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
        primary: {
          900: "#1e3a8a",
          700: "#1d4ed8",
          500: "#3b82f6",
          100: "#dbeafe",
        },
        secondary: {
          900: "#78350f",
          700: "#b45309",
          500: "#f59e0b",
        },
        gray: {
          900: "#111827",
          700: "#374151",
          500: "#6b7280",
          100: "#f3f4f6",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.1", fontWeight: "800" }],
        "h2": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "h3": ["1.875rem", { lineHeight: "1.3", fontWeight: "600" }],
        "h4": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
