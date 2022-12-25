// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
	alias: {
		'@logo': '/assets/logo',
	},
	tailwindcss: {
		config: {
			content: [],
			important: false,
			theme: {
				extend: {
					colors: {
						primary: '#0f0f0f',
						secondary: '#1e1e1e',
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
