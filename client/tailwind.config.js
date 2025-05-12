/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // kalau ada file HTML statis di public:
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
