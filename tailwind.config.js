module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // EXISTENTE
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // NOVA animação lateral esquerda
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slideIn': 'slideIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
      backgroundImage: {
        'auth-pattern': "url('/src/features/splash/assets/Auth.png')",
      },
      boxShadow: {
        'white-glow': '0 0 10px rgba(255, 255, 255, 0.5)',
        'yellow-glow-focus': '0 0 8px rgba(255, 217, 102, 0.7)',
      },
      textShadow: {
        'default': '1px 1px 4px rgba(255,255,255,0.7)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          'text-shadow': '1px 1px 4px rgba(255,255,255,0.7)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
