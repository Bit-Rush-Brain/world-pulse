/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.35', letterSpacing: '0.05em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '0.01em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.01em', fontWeight: '800' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.005em', fontWeight: '800' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.002em', fontWeight: '900' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.001em', fontWeight: '900' }],
            },
            fontFamily: {
                heading: "syne",
                paragraph: "space grotesk"
            },
            colors: {
                destructive: '#FF0000',
                'destructive-foreground': '#FFFFFF',
                'accent-blue': '#007AFF',
                'accent-blue-foreground': '#FFFFFF',
                'accent-purple': '#AF52DE',
                'accent-purple-foreground': '#FFFFFF',
                'glassmorphism-overlay': 'rgba(255, 255, 255, 0.05)',
                background: '#0A0A0A',
                secondary: '#39FF14',
                foreground: '#E0E0E0',
                'secondary-foreground': '#000000',
                'primary-foreground': '#000000',
                primary: '#00FFFF'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
