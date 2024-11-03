export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      fontFamily: {
        sriracha: ['Sriracha', 'cursive'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  safelist: [
    { pattern: /bg-opacity-(\d{1,2}|100)/ },
    { pattern: /opacity-(\d{1,2}|100)/ },
    { pattern: /blur-(none|sm|md|lg|xl|2xl|3xl|\d{1,2}|100)/ },
    { pattern: /backdrop-blur-(none|sm|md|lg|xl|2xl|3xl|\d{1,2}|100)/ },
    { pattern: /bg-./ },
    { pattern: /text-./ },
    { pattern: /border-./ },
  ],

  daisyui: {
    themes: [
      {
        wonder: {
          "primary": "#f4e3a1",        // Soft star light color
          "secondary": "#c1a8db",      // Gentle pastel purple from the clouds and flowers
          "accent": "#68a4c6",         // Soft blue for depth in the sky
          "neutral": "#3c4757",        // Dark blue for night sky background
          "base-100": "#1f2735",       // Deeper night sky base color
          "info": "#a8d8ff",           // Light blue for clouds and other elements
          "success": "#79c99e",        // Pastel green for grassy parts
          "warning": "#ffcb8b",        // Warm yellow for glowing stars
          "error": "#ff8b8b",          // Soft pink/red for flowers
        }
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ]
  },
  themes: [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ],
}