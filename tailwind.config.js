/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 15% 95%)',
        accent: 'hsl(40 90% 55%)',
        primary: 'hsl(240 80% 50%)',
        surface: 'hsl(0 0% 100%)',
        textPrimary: 'hsl(220 15% 25%)',
        textSecondary: 'hsl(220 15% 45%)',
        cosmic: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          yellow: '#F59E0B'
        }
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px'
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px'
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 15%, 20%, 0.08)',
        'cosmic': '0 0 20px rgba(139, 92, 246, 0.3)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}
