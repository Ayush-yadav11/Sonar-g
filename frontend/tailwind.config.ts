import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'app-theme': {
					cream: '#FEF3E2',
					yellow: '#F3C623',
					orange: '#FFB22C',
					'orange-dark': '#FA812F'
				},
				'app-neutral': {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					300: '#D4D4D4',
					400: '#A3A3A3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717'
				},
				primary: {
					DEFAULT: '#F3C623',
					foreground: '#171717',
				},
				secondary: {
					DEFAULT: '#FEF3E2',
					foreground: '#171717',
				},
				success: {
					DEFAULT: '#22C55E',
					light: '#86EFAC'
				},
				destructive: {
					DEFAULT: '#EF4444',
					light: '#FCA5A5'
				},
				muted: {
					DEFAULT: '#FEF3E2',
					foreground: '#737373',
				},
				accent: {
					DEFAULT: '#FA812F',
					foreground: '#FFFFFF',
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#171717',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				link: 'hsl(var(--link))'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-theme': 'linear-gradient(135deg, #FEF3E2, #F3C623)',
				'gradient-theme-soft': 'linear-gradient(135deg, #FEF3E2, #FFB22C)',
				'gradient-theme-warm': 'linear-gradient(135deg, #FFB22C, #FA812F)',
				'gradient-layers': 'linear-gradient(to bottom, #FEF3E2 0%, #F3C623 33%, #FFB22C 66%, #FA812F 100%)',
				'gradient-gold': 'linear-gradient(135deg, #DB7207, #F5A742)',
				'gradient-gold-soft': 'linear-gradient(135deg, rgba(219,114,7,0.05), rgba(245,167,66,0.05))',
				'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #242424 100%)',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'wave': {
					'0%': { transform: 'translateX(0) translateY(0) rotate(0)' },
					'25%': { transform: 'translateX(2%) translateY(-2%) rotate(2deg)' },
					'50%': { transform: 'translateX(-1%) translateY(1%) rotate(-1deg)' },
					'75%': { transform: 'translateX(1%) translateY(-1%) rotate(1deg)' },
					'100%': { transform: 'translateX(0) translateY(0) rotate(0)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-gold': {
					'0%': { boxShadow: '0 0 0 0 rgba(219,114,7,0.4)' },
					'70%': { boxShadow: '0 0 0 10px rgba(219,114,7,0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(219,114,7,0)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' },
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'wave-slow': 'wave 8s ease-in-out infinite',
				'wave-medium': 'wave 6s ease-in-out infinite',
				'wave-fast': 'wave 4s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-gold': 'pulse-gold 2s infinite',
				'shimmer': 'shimmer 8s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'gradient': 'gradient-shift 8s ease infinite',
			},
			fontFamily: {
				sans: ["Inter var", ...fontFamily.sans],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
