module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Arial', 'sans-serif'],
      },
      colors: {
        ink: 'var(--ink)',
        navy: 'var(--navy)',
        teal: {
          DEFAULT: 'var(--teal)',
          dark: 'var(--teal-dark)',
        },
        purple: 'var(--purple)',
        muted: 'var(--muted)',
        paper: '#ffffff',
        mist: '#f4f6fa',
      },
      maxWidth: {
        page: 'var(--page-width)',
      },
      transitionTimingFunction: {
        brand: 'var(--ease)',
      },
    },
  },
  plugins: [],
};
