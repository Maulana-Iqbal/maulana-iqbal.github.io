/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: " 'Dancing Script', cursive",
      },

      colors: {
        countdown: '#DCDCDC',
      },

      backgroundImage: {
        'hero': "url('./src/assets/decoration/hand_painted_neutrol_toned_watercolour_design_2706 1.jpg')",
      }
    },
  },
  plugins: [],
}
