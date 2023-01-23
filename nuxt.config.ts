// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/supabase',
		'@nuxtjs/tailwindcss',
		'nuxt-icon',
		'@pinia/nuxt',
	],
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
