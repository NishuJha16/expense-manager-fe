module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
      extend: {
      backgroundImage: {
        'progress-pattern': "url('assets/progress-pattern.svg')",
      }
    },
  },
  plugins: [],
}