/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "soft-blue": "#5368df",
          "soft-red": "#fa5757",
        },
        neutral: {
          "grayish-blue": "#9194a1",
          "very-dark-blue": "#252b46",
        },
      },
      transitionProperty: {
        "accordion-arrow": "transform, border-color",
      },
    },
  },
  plugins: [],
};
