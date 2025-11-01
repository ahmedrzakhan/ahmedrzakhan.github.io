/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Liquid Glass Theme Colors - Softer, More Subtle Palette
        primary: {
          DEFAULT: '#6DD5ED', // Soft sky blue
          light: '#A8E6F7',
          dark: '#4FB3CC',
        },
        secondary: {
          DEFAULT: '#B490CA', // Soft lavender
          light: '#D4C5E0',
          dark: '#9370B8',
        },
        accent: {
          DEFAULT: '#F4A5AE', // Soft rose
          light: '#FFC9D0',
          dark: '#E88A95',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
        bg: {
          primary: '#1a1d2e', // Lighter, softer dark blue
          secondary: '#252837',
          tertiary: '#2f3241',
        },
        // Brand colors for social media
        'github': '#24292e',
        'linkedin': '#0077b5',
        'twitter': '#1da1f2',
        'leetcode': '#ffa116',
        'gmail': '#ea4335',
      },
      backgroundImage: {
        'gradient-liquid': 'linear-gradient(135deg, #6DD5ED 0%, #B490CA 50%, #F4A5AE 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #6DD5ED 0px, transparent 50%), radial-gradient(at 80% 0%, #B490CA 0px, transparent 50%), radial-gradient(at 0% 50%, #F4A5AE 0px, transparent 50%), radial-gradient(at 80% 100%, #6DD5ED 0px, transparent 50%), radial-gradient(at 0% 100%, #B490CA 0px, transparent 50%)',
        'glass-shimmer': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '80px',
        '5xl': '100px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'liquid-flow': 'liquidFlow 20s ease-in-out infinite',
        'glass-reflection': 'glassReflection 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(109, 213, 237, 0.25), 0 0 40px rgba(180, 144, 202, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(109, 213, 237, 0.4), 0 0 60px rgba(180, 144, 202, 0.3), 0 0 80px rgba(244, 165, 174, 0.2)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        liquidFlow: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '25%': {
            transform: 'translate(5%, 5%) rotate(90deg)',
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          },
          '50%': {
            transform: 'translate(0, 10%) rotate(180deg)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '75%': {
            transform: 'translate(-5%, 5%) rotate(270deg)',
            borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
          },
        },
        glassReflection: {
          '0%, 100%': {
            opacity: '0.05',
            transform: 'translateX(-100%) skewX(-15deg)',
          },
          '50%': {
            opacity: '0.15',
            transform: 'translateX(100%) skewX(-15deg)',
          },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(109, 213, 237, 0.12)',
        'glass-lg': '0 12px 48px 0 rgba(109, 213, 237, 0.15), 0 0 24px 0 rgba(180, 144, 202, 0.12)',
        'glass-xl': '0 20px 60px 0 rgba(109, 213, 237, 0.2), 0 0 40px 0 rgba(180, 144, 202, 0.15), 0 0 20px 0 rgba(244, 165, 174, 0.12)',
        'glow-primary': '0 0 30px rgba(109, 213, 237, 0.3)',
        'glow-secondary': '0 0 30px rgba(180, 144, 202, 0.3)',
        'glow-accent': '0 0 30px rgba(244, 165, 174, 0.3)',
      },
    },
  },
  plugins: [],
}