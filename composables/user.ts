import { AuthError } from '@supabase/gotrue-js';

const returnMain = (): void => {
	navigateTo('/notes');
};

const userSignOut = async (): Promise<AuthError | void> => {
	const supabase = useSupabaseAuthClient();

	const { error } = await supabase.auth.signOut();

	if (error) return error;

	returnMain();
};

const userSignIn = async (
	email: string,
	password: string
): Promise<AuthError | void> => {
	const { error } = await useSupabaseAuthClient().auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) return error;

	returnMain();
};

export { userSignOut, userSignIn };
