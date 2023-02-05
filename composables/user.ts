import { AuthError } from '@supabase/gotrue-js';

export const userSignOut = async (): Promise<AuthError | void> => {
	const router = useRouter();
	const supabase = useSupabaseAuthClient();

	const { error } = await supabase.auth.signOut();

	if (error) return error;

	router.push('/');
};
