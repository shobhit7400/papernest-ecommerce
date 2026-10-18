/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#17233F', sheet: '#EDF0EA', paper: '#FAFBF8', mark: '#F5D547', rule: '#B9C4D6', soft: '#5B6781' },
      fontFamily: { display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'], body: ['Newsreader', 'Georgia', 'serif'] }
    }
  },
  plugins: []
}
