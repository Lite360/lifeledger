/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#123D2D',
          emerald: '#16845B',
          sage: '#E4F0E8',
          hover: '#0E6343',
          dark: '#0A251B',
          subtle: '#F0F6F2',
        },
        surface: {
          main: '#FAF8F1',
          card: '#FFFFFF',
          muted: '#F2EFE8',
          border: '#E5E1D8',
          input: '#FAFAF7',
        },
        primaryText: '#252B27',
        mutedText: '#747C76',
        status: {
          warning: '#A65D12',
          danger: '#B42318',
          success: '#16845B',
          info: '#1C6486',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'brand': '0.625rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(18, 61, 45, 0.05), 0 1px 2px -1px rgba(18, 61, 45, 0.05)',
        'card': '0 4px 16px -2px rgba(18, 61, 45, 0.06), 0 2px 6px -2px rgba(18, 61, 45, 0.04)',
        'elevated': '0 10px 25px -5px rgba(18, 61, 45, 0.1), 0 8px 10px -6px rgba(18, 61, 45, 0.05)',
      },
    },
  },
  plugins: [],
}


