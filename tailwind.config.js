// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.8s ease-out forwards',
      },
      backgroundImage: {
        'auth-pattern': "url('../public/imgs/Auth.png')", // Adicione sua imagem de fundo
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
    // Se você estiver usando um plugin para text-shadow, instale-o e adicione aqui.
    // Ex: require('tailwindcss-textshadow'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          'text-shadow': '1px 1px 4px rgba(255,255,255,0.7)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}