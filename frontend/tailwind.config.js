/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

// Tailwind configuration
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '104': '26rem',
        '72': '18rem',
      },
      },
    },
  plugins: [
    daisyui,
    ],
  }

