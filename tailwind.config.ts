import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		// padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {  		
		 fontFamily: {
        Oswald: ['Oswald', 'sans-serif'],
      },
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			// background: 'hsl(var(--background))',
			background: '#F2F2F4',
			
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: '#d0ac80',
  				foreground: '#9E6A2E'
  			},
  			secondary: {
  				DEFAULT: '#F5F3ED',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: '#fa412d',
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
  			}
  		},
  		borderRadius: {
  			lg: '10px',
  			md: '8px',
  			sm: '6px'
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
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  		},
		backgroundImage: {
        'wp-bg': "url('https://demo031087.web30s.vn/datafiles/web30s/upload/images/1000-1100/30S-03-1087/wp-bg.png')",
		'service-bg': "url('https://demo031087.web30s.vn/datafiles/web30s/upload/images/1000-1100/30S-03-1087/service-bg.jpg')",
		'process-bg': "url('https://demo031087.web30s.vn/datafiles/web30s/upload/images/1000-1100/30S-03-1087/faq-right-bg.png')",
      },

    //   backgroundImage: {
    //     'grid-pattern-light': 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
    //     'grid-pattern-dark': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
    //   },
    //   backgroundSize: {
    //     'grid': '40px 40px',
    //   },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config