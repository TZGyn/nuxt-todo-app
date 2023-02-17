import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import { Database } from 'types/database.types';

export default defineEventHandler(async (event): Promise<ApiResponse> => {
	const user = await serverSupabaseUser(event);
	const supabase = serverSupabaseClient<Database>(event);
	const query = getQuery(event);
	const body = await readBody(event);

	const title: string = body.title;
	const description: string = body.description;

	if (!user) {
		throw createError({ statusCode: 401, message: 'Unauthorized' });
	}

	const { data: note, error } = await supabase
		.from('notes')
		.update({ title: title, description: description })
		.eq('uuid', query.id);

	return { status: 200, message: 'Note Updated', error: error };
});
