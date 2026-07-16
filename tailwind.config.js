/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './calculator.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:     '#0A1B3D',
        navydeep: '#06122B',
        charcoal: '#0F1A33',
        brand:    '#F37021',
        branddeep:'#D85A0F',
        blue:     '#1E55C7',
        bluedeep: '#143E96',
        bluesoft: '#EAF1FE',
        ink:      '#0F172A',
        slate1:   '#475569',
        slate2:   '#64748B',
        slate3:   '#94A3B8',
        line:     '#E2E8F0',
        soft:     '#F8FAFC',
        gReview:  '#FBBC05',
        gGreen:   '#34A853',
        gRed:     '#EA4335',
        gBlue:    '#4285F4'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow:     '0 0 0 1px rgba(243,112,33,0.28), 0 10px 40px -10px rgba(243,112,33,0.50)',
        glowBlue: '0 0 0 1px rgba(30,85,199,0.30),  0 10px 40px -10px rgba(30,85,199,0.55)',
        soft:     '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10)',
        lifted:   '0 2px 4px rgba(15,23,42,0.04), 0 24px 48px -16px rgba(15,23,42,0.18)',
        ring:     '0 0 0 8px rgba(30,85,199,0.08)'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(243,112,33,0.55)' },
          '50%':       { boxShadow: '0 0 0 14px rgba(243,112,33,0)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-6px)' }
        },
        sweep: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-out infinite',
        floaty:    'floaty 4s ease-in-out infinite',
        sweep:     'sweep 2.5s ease-in-out infinite',
        marquee:   'marquee 30s linear infinite'
      }
    }
  },
  plugins: []
};
