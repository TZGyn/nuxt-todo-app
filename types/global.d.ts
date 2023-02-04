import { PostgrestError } from '@supabase/postgrest-js';

export {};

declare global {
	interface Note {
		title: string;
		description: string;
	}

	interface ApiResponse {
		status: number;
		message: string;
		error: PostgrestError | null;
	}

	interface DeleteResponse extends ApiResponse {
		data: undefined[] | null;
	}
}
