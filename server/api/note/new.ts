import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'utils/database.types';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}

	const { data: status, error: insertError } = await supabase
		.from('notes')
		.insert({ title: '', description: '', user_id: user.id });

	const { data: note, error: fetchError } = await supabase
		.from('notes')
		.select('id')
		.order('created_at', { ascending: false })
		.limit(1)
		.single();

	return {
		statusCode: 200,
		note: note,
		message: 'Note Created',
		insertError: insertError,
		fetchError: fetchError,
	};
});
