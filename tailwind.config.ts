import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-ui)", "monospace"],
      },
      colors: {
        surface: "var(--bg-base)",
        lift: "var(--bg-lift)",
        strong: "var(--tone-strong)",
        medium: "var(--tone-medium)",
        faint: "var(--tone-faint)",
        subtle: "var(--border-subtle)",
        muted: "var(--text-muted)",
        glass: "var(--light-16)",
      },
      borderRadius: {
        btn: "8px",
        card: "10px",
        case: "20px",
      },
      backdropBlur: {
        glass: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
