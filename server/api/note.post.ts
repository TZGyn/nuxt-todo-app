import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'utils/database.types';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);
	const query = getQuery(event);
	const body = await readBody(event);

	const description: string = body.description;

	const { data: note, error } = await supabase
		.from('notes')
		.update({ description: description })
		.eq('id', query.id);

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}
	return { statusCode: 200, message: 'Note Updated', error: error };
});
