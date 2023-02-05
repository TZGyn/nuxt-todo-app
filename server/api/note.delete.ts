import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'utils/database.types';

export default defineEventHandler(async (event): Promise<DeleteResponse> => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);
	const query = getQuery(event);

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}

	const { data: data, error } = await supabase
		.from('notes')
		.delete()
		.eq('uuid', query.id)
		.eq('user_id', user.id);

	return {
		status: 200,
		data: data,
		message: 'Note Deleted',
		error: error,
	};
});
