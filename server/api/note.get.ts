import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'utils/database.types';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);
	const query = getQuery(event);

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}

	const { data: note, error } = await supabase
		.from('notes')
		.select('*')
		.eq('id', query.id);

	return { note: note ? note[0] : null, error: error };
});
