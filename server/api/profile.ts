import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'utils/database.types';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);

	const { count, error } = await supabase
		.from('notes')
		.select('*', { count: 'exact', head: true });

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}
	return { count: count, message: 'Profile', error: error };
});
