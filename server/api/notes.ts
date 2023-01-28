import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'utils/database.types';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}

	const { data: notes, error } = await supabase
		.from('notes')
		.select('*')
		.eq('user_id', user.id);

	return { notes: notes, error: error };
});
