import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'types/database.types';

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
		.eq('uuid', query.id)
		.eq('user_id', user.id)
		.limit(1)
		.single();

	if (!note) {
		throw createError({ statusCode: 500, message: 'No note found' });
	}

	return { note: note, error: error };
});
