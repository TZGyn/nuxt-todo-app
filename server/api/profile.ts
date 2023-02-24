import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { Database } from 'types/database.types'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const supabase = serverSupabaseClient<Database>(event)

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' })
	}

	const { count, error } = await supabase
		.from('notes')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', user.id)

	return { count: count, message: 'Profile', error: error }
})
