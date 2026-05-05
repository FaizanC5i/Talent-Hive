import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
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
				tag: {
					// Status tags
					'status-pending': 'hsl(var(--tag-status-pending))',
					'status-pending-foreground': 'hsl(var(--tag-status-pending-foreground))',
					'status-progress': 'hsl(var(--tag-status-progress))',
					'status-progress-foreground': 'hsl(var(--tag-status-progress-foreground))',
					'status-success': 'hsl(var(--tag-status-success))',
					'status-success-foreground': 'hsl(var(--tag-status-success-foreground))',
					'status-error': 'hsl(var(--tag-status-error))',
					'status-error-foreground': 'hsl(var(--tag-status-error-foreground))',
					
					// Source/Channel tags
					'source-base': 'hsl(var(--tag-source-base))',
					'source-base-foreground': 'hsl(var(--tag-source-base-foreground))',
					'source-linkedin': 'hsl(var(--tag-source-linkedin))',
					'source-linkedin-foreground': 'hsl(var(--tag-source-linkedin-foreground))',
					'source-workday': 'hsl(var(--tag-source-workday))',
					'source-workday-foreground': 'hsl(var(--tag-source-workday-foreground))',
					'source-indeed': 'hsl(var(--tag-source-indeed))',
					'source-indeed-foreground': 'hsl(var(--tag-source-indeed-foreground))',
					
					// Match score tags
					'match-excellent': 'hsl(var(--tag-match-excellent))',
					'match-excellent-foreground': 'hsl(var(--tag-match-excellent-foreground))',
					'match-good': 'hsl(var(--tag-match-good))',
					'match-good-foreground': 'hsl(var(--tag-match-good-foreground))',
					'match-moderate': 'hsl(var(--tag-match-moderate))',
					'match-moderate-foreground': 'hsl(var(--tag-match-moderate-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'enterprise-sm': 'var(--shadow-sm)',
				'enterprise-md': 'var(--shadow-md)',
				'enterprise-lg': 'var(--shadow-lg)'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
