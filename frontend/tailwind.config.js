/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Chivo", "Rajdhani", "sans-serif"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Tactical HUD palette
        graphite: {
          900: "#0A0C10",
          800: "#0E1014",
          700: "#161A20",
          600: "#1C2128",
          500: "#22272E",
          400: "#30363D",
        },
        signal: {
          orange: "#FF5722",
          DEFAULT: "#FF5722",
        },
        tactical: {
          amber: "#FFB000",
          DEFAULT: "#FFB000",
        },
        hud: {
          green: "#00FF41",
          DEFAULT: "#00FF41",
        },
        alert: {
          red: "#FF3B30",
          DEFAULT: "#FF3B30",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 255, 65, 0.5)" },
          "50%": { boxShadow: "0 0 0 8px rgba(0, 255, 65, 0)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "41.99%": { opacity: "1" },
          "42%": { opacity: "0.6" },
          "43%": { opacity: "1" },
          "47.99%": { opacity: "1" },
          "48%": { opacity: "0.8" },
          "49%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "radar-sweep": "radar-sweep 4s linear infinite",
        "scan-line": "scan-line 6s linear infinite",
        blink: "blink 1s steps(2, start) infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        flicker: "flicker 4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
