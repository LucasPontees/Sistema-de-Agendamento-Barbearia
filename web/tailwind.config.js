// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#00b37e',   // Verde esmeralda
            dark: '#009168',      // Verde escuro
            light: '#33c9a1',     // Verde claro
          },
          secondary: {
            DEFAULT: '#065f46',   // Verde floresta
          },
          background: {
            DEFAULT: '#f9fafb',   // Cinza muito claro
            light: '#0d0f10',     // Preto acinzentado
          },
          text: {
            DEFAULT: '#111827',   // Cinza muito escuro
            dark: '#e5e7eb',      // Cinza claro
            muted: '#9ca3af',     // Cinza médio
          },
          border: {
            DEFAULT: '#1f2937',   // Cinza escuro
          },
          feedback: {
            success: '#22c55e',   // Verde
            error: '#ef4444',     // Vermelho
            warning: '#facc15',   // Amarelo
            info: '#3b82f6',      // Azul
          },
        },
      },
    },
    plugins: [],
  }
  