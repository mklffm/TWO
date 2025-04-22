/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f3ff",
          100: "#cce7ff",
          200: "#99cfff",
          300: "#66b7ff",
          400: "#339fff",
          500: "#0087ff",
          600: "#006ccc",
          700: "#005199",
          800: "#003666",
          900: "#001b33",
          950: "#000e1a",
        },
        secondary: {
          50: "#e6fff0",
          100: "#ccffe0",
          200: "#99ffc2",
          300: "#66ffa3",
          400: "#33ff85",
          500: "#00ff66",
          600: "#00cc52",
          700: "#00993d",
          800: "#006629",
          900: "#003314",
          950: "#001a0a",
        },
        gradient: {
          start: "#0087ff", // blue
          mid: "#00a8cc", // teal
          end: "#00cc52", // green
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'slow-zoom': 'slow-zoom 30s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
        'slide-up': 'slideUp 0.3s ease-out forwards',
      },
      keyframes: {
        'slow-zoom': {
          '0%, 100%': { transform: 'scale(1.0)' },
          '50%': { transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'neomorphic': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'inner-neomorphic': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}; 