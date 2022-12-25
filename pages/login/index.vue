<template>
	<div class="app">
		<Header />
		<div
			class="bg-secondary mx-auto mt-12 flex h-96 w-96 flex-col items-center justify-center gap-8 rounded-xl p-8">
			<div class="flex w-full flex-col gap-2">
				<label> Email </label>
				<input
					type="text"
					v-model="credential.email"
					placeholder="username" />
			</div>
			<div class="flex w-full flex-col gap-2">
				<label> Password </label>
				<input
					type="password"
					v-model="credential.password"
					placeholder="password" />
			</div>
			<p
				class="cursor-pointer text-blue-500 underline"
				@click="
					mode === 'login' ? (mode = 'signup') : (mode = 'login')
				">
				{{
					mode === 'login'
						? "Don't have an account? Sign up"
						: 'Already have an account? Login'
				}}
			</p>
			<button
				v-on="
					mode === 'login'
						? { click: () => signIn($event) }
						: { click: () => signUp($event) }
				">
				{{ mode === 'login' ? 'Login' : 'Sign Up' }}
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	interface Credential {
		email: string;
		password: string;
	}

	type Mode = 'login' | 'signup';

	const credential: Credential = reactive({
		email: '',
		password: '',
	});

	const router = useRouter();
	const supabase = useSupabaseAuthClient();
	const user = useSupabaseUser();
	const mode = ref<Mode>('login');

	watch(
		() => user.value,
		() => {
			if (user.value) {
				router.push('/notes');
			}
		}
	);

	const signUp = async (event: Event) => {
		const { data: user, error } = await supabase.auth.signUp({
			email: credential.email,
			password: credential.password,
		});
		console.log('user', user);
		console.log('error', error);
	};

	const signIn = async (event: Event) => {
		const { data: user, error } = await supabase.auth.signInWithPassword({
			email: credential.email,
			password: credential.password,
		});
		console.log('user', user);
		console.log('error', error);
	};
</script>

<style scoped>
	input {
		@apply h-12 w-full rounded-md border border-[#373737] bg-[#2b2b2b] p-4 text-lg placeholder:text-[#4f4f4f] focus:outline-none active:outline-none;
	}

	button {
		@apply w-fit rounded-lg bg-blue-500 py-4 px-8;
	}

	label {
		@apply w-full text-[#b3b3b3];
	}
</style>
