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
            DEFAULT: '#00b37e',   // Verde principal
            dark: '#009168',
            light: '#33c9a1',
          },
          secondary: {
            DEFAULT: '#065f46',   // Verde escuro esportivo
          },
          background: {
            DEFAULT: '#0d0f10',   // Fundo principal escuro
            light: '#f9f9f9',     // Alternativo claro
          },
          text: {
            DEFAULT: '#e5e7eb',   // Texto claro sobre fundo escuro
            dark: '#111827',      // Texto escuro sobre fundo claro
            muted: '#9ca3af',     // Texto secundário
          },
          border: {
            DEFAULT: '#1f2937',   // Borda discreta
          },
          feedback: {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#facc15',
            info: '#3b82f6',
          },
        },
      },
    },
    plugins: [],
  }
  