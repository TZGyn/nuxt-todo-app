// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'nuxt-icon',
		'@pinia/nuxt',
	],
	app: {
		pageTransition: false,
		layoutTransition: false,
	},
	alias: {
		'@logo': '/assets/logo',
		'@assets': '/assets',
		'@stores': '/stores',
	},
	tailwindcss: {
		config: {
			content: [],
			important: false,
			theme: {
				extend: {
					colors: {
						primary: '#0c0c0d',
						secondary: '#18181b',
						darkgray: '#121213',
						lightgray: '#27272a',
					},
				},
			},
		},
	},
	typescript: {
		strict: true,
	},
	supabase: {
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
		serviceKey: process.env.SUPABASE_SERVICE_KEY,
	},
});
