module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
  
        primary: {
          DEFAULT: "hsl(var(--chad-primary))",
          foreground: "hsl(var(--chad-primary-foreground))",
        },
  
        popover: {
          DEFAULT: "hsl(var(--chad-popover))",
          foreground: "hsl(var(--chad-popover-foreground))",
        },
  
  
        background: "hsl(var(--chad-background))",
  
      },

    },
  },
  plugins: [],
}
