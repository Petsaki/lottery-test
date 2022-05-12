module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        getBig: {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(1.2)' },
        },
        toastFrameRight: {
          '0% , 100%': { transform: 'translateX(-100%)' },
          '5% , 95%': { transform: 'translateX(0%)'}
        },
        toastFrameUp:{
          '0% , 100%': { transform: 'translateY(200%)' },
          '5% , 95%': { transform: 'translateY(0%)'}
        }
      },
      animation: {
        'toastAniMD': 'toastFrameRight 4s ease-out forwards ',
        'toastAniSM': 'toastFrameUp 4s ease-out forwards '
      },
    },
  },
  plugins: [],
}
