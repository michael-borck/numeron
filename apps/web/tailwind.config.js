/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        terminal: ['"Share Tech Mono"', '"Courier Prime"', 'monospace'],
        body: ['"Courier Prime"', 'Courier', 'monospace'],
        arcane: ['Cinzel', 'serif'],
        readable: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      colors: {
        phosphor: {
          amber: '#ffb000',
          green: '#39ff14',
          dim: '#7a5500',
          bg: '#0a0a08',
          'bg-secondary': '#111109',
          border: '#2a2308',
        },
        arcane: {
          bg: '#f5f0e8',
          'bg-secondary': '#ede8dd',
          'ink-dark': '#1a1208',
          'ink-mid': '#3d2b0a',
          gold: '#8b6914',
          sepia: '#a0845c',
        },
      },
      screens: {
        xs: '360px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'count-up': 'count-up 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
