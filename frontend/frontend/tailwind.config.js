/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                building: "url('./src/assets/images/mnogokvartirnyj-dom.jpg')",
            },
            padding: {
                aspect: "36.81%",
            },
            fontFamily: {
                montserrat: ['"Montserrat"'],
            },
        },
    },
    plugins: [],
};
