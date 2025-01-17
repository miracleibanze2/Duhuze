/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg,css}"],
  theme: {},
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply md:max-w-[77.5rem] xl:max-w-[87.5rem] max-w-full max-sm:min-w-full":
            {},
        },
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[2rem] leading-[2.5rem] md:text-[2.5rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[1.7rem] leading-normal md:text-[2rem]": {},
        },
        ".h4": {
          "@apply text-[1.2rem] md:text-[1.7rem] leading-normal text-[rgb(63,63,70/0.7)]":
            {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] font-normal leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-normal text-[0.875rem] leading-6 md:text-base": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-light text-xs tracking-tight uppercase": {},
        },
        ".button": {
          "@apply text-xs font-bold text-[0.875rem] focus:ring-blue-200 leading-6 md:text-base font-semibold tracking-wider":
            {},
        },
        ".input": {
          "@apply text-sm w-full p-1 pl-3 border cursor-pointer border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500":
            {},
        },
      });
    }),
  ],
};
