/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          hover: '#FA581C',
          light: '#FFF0EB',
        },
        secondary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#EFF6FF',
        },
        surface: '#FFFFFF',
        background: '#F5F6F8',
        zinc: {
          850: '#1e1e24',
          900: '#18181B',
          950: '#0F0F12',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        }
      },
      borderRadius: {
        '32': '32px',
        '28': '28px',
        '24': '24px',
        '20': '20px',
        '16': '16px',
        '14': '14px',
        '12': '12px',
      },
      boxShadow: {
        'card-shadow': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
