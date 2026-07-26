/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#05070D',
        card: '#111827',
        primary: {
          DEFAULT: '#00E5FF',
          hover: '#00C8E0',
          glow: 'rgba(0, 229, 255, 0.4)',
        },
        secondary: {
          DEFAULT: '#5B5BFF',
          hover: '#4A4AFF',
          glow: 'rgba(91, 91, 255, 0.4)',
        },
        accent: {
          DEFAULT: '#FF9F00',
          hover: '#E08C00',
          glow: 'rgba(255, 159, 0, 0.4)',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.08)',
          bg: 'rgba(17, 24, 39, 0.65)',
          hover: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'speed-line': 'speedLine 1.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(35px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        speedLine: {
          '0%': { transform: 'translateY(-100%) scaleY(0.5)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100%) scaleY(1.5)', opacity: '0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(circle at 50% 30%, rgba(0, 229, 255, 0.15) 0%, rgba(91, 91, 255, 0.08) 35%, rgba(5, 7, 13, 0.95) 75%)',
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
