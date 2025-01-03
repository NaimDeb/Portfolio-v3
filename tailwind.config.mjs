const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "slide-logos": "slide-logos 30s linear infinite",
        "vertical-slide": "vertical-slide 30s linear infinite forwards",
        "slide-bg": "slideBg 8s ease-in-out",
      },
      keyframes: {
        "slide-logos": {
          to: { transform: "translateX(calc(-50% - 2rem))" },
        },
        "vertical-slide": {
          to: { transform: "translateY(calc(-50% - 2rem))" },
        },
        slideBg: {
          "0%": { "background-position": "center top" },
          "100%": { "background-position": "center bottom" },
        },
        dropShadow: {
          glow: [
            "0 0px 20px rgba(255,255, 255, 0.35)",
            "0 0px 65px rgba(255, 255,255, 0.2)"
          ]
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        background: "hsl(var(--background))",
        "dark-background": "hsl(var(--dark-background))",
        accent: "hsl(var(--accent))",
        foreground: "hsl(var(--foreground))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        "dark-border": "hsl(var(--dark-border))",
        card: "hsl(var(--card))",
        "dark-card": "hsl(var(--dark-card))",
      },
      backgroundImage: {
        photo: "url('./assets/gato.png')",
        pattern:
          "radial-gradient(circle at top center, #f5fdff 70px, white), repeating-radial-gradient(circle at top center, #ffffff, #ffffff, 200px, transparent 0, #eaeaea 201px)",
        "dark-pattern":
          "radial-gradient(circle at top center, #2d3748 70px, #1a202c), repeating-radial-gradient(circle at top center, #1a202c, #1a202c, 200px, transparent 0, #eaeaea 201px)",
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}