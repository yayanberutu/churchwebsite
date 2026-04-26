/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00236f",
        "primary-container": "#1e3a8a",
        "on-primary": "#ffffff",
        "secondary": "#af2b3e",
        "background": "#f8f9fa",
        "surface": "#f8f9fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container-highest": "#e1e3e4",
        "surface-variant": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-surface-variant": "#444651",
        "tertiary": "#4b1c00",
        "tertiary-container": "#6e2c00",
        "on-tertiary-container": "#f39461",
        "outline-variant": "#c5c5d3",
        "on-primary-fixed-variant": "#264191",
        "on-tertiary-fixed-variant": "#773205",
        "on-secondary-fixed-variant": "#8e0f28",
        "on-primary-container": "#90a8ff",
        "on-secondary-container": "#680018",
        "secondary-container": "#fd6673",
      },
      fontFamily: {
        "headline": ["Public Sans", "sans-serif"],
        "body": ["Be Vietnam Pro", "sans-serif"],
        "label": ["Be Vietnam Pro", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
      },
    },
  },
  plugins: [],
}
