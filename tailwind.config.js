/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
            color: 'inherit',
            h1: {
              color: 'inherit',
            },
            h2: {
              color: 'inherit',
              marginTop: '1.5em',
            },
            h3: {
              color: 'inherit',
              marginTop: '1.2em',
            },
            a: {
              color: 'var(--color-primary)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: 'inherit',
              fontWeight: '600',
            },
            code: {
              color: 'inherit',
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
              padding: '0.2em 0.4em',
              fontWeight: 'normal',
            },
            blockquote: {
              color: 'inherit',
              borderLeftColor: 'var(--color-border)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 