import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#e9fffc",
        "tertiary-fixed-dim": "#ffb95f",
        "surface-container-high": "#e5e9e9",
        "on-tertiary-fixed": "#2a1700",
        "on-secondary-fixed-variant": "#314c4a",
        "on-surface-variant": "#3f4948",
        "surface-container-lowest": "#ffffff",
        "inverse-primary": "#87d4cf",
        "on-primary-fixed-variant": "#00504d",
        "surface-container": "#ebefef",
        "on-secondary-fixed": "#03201e",
        "primary-fixed-dim": "#87d4cf",
        "error": "#ba1a1a",
        "inverse-on-surface": "#edf1f1",
        "on-surface": "#181c1d",
        "on-primary": "#ffffff",
        "tertiary": "#805000",
        "surface-container-highest": "#dfe3e3",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "surface-dim": "#d7dbdb",
        "tertiary-container": "#a26600",
        "surface-variant": "#dfe3e3",
        "background": "#f6fafa",
        "on-background": "#181c1d",
        "primary-fixed": "#a3f0eb",
        "outline": "#6f7978",
        "secondary-fixed-dim": "#afccca",
        "on-tertiary-fixed-variant": "#653e00",
        "secondary-container": "#c8e6e3",
        "inverse-surface": "#2c3132",
        "primary": "#056662",
        "surface-tint": "#0f6966",
        "outline-variant": "#bec9c7",
        "surface": "#f6fafa",
        "on-secondary-container": "#4c6866",
        "primary-container": "#2f7f7b",
        "on-error-container": "#93000a",
        "surface-bright": "#f6fafa",
        "on-tertiary-container": "#fff9f7",
        "secondary": "#486361",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-low": "#f0f4f4",
        "tertiary-fixed": "#ffddb8"
      },
      fontFamily: {
        headline: ["Inter"],
        body: ["Inter"],
        label: ["Inter"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    },
  },
  plugins: [],
};
export default config;
