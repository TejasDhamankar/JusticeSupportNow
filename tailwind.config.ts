const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#1f3d34",
        "mid-green": "#2f584b",
        "light-sage": "#6b8b73",
        "soft-mint": "#b7d0b7",
        "text-light": "#f7f7f7",
      },
      backgroundImage: {
        "green-gradient": "linear-gradient(to right, #2f584b, #6b8b73)",
      },
    },
  },
  darkMode: "class",
};

export default config;
