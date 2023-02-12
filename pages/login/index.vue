<template>
	<App>
		<Header />
		<div
			class="bg-secondary mx-auto mt-12 flex h-96 w-96 flex-col items-center justify-center gap-8 rounded-xl p-8">
			<div class="flex w-full flex-col gap-2">
				<label class="w-full text-[#b3b3b3]"> Email </label>
				<input
					type="text"
					class="bg-lightgray border-lightgray h-12 w-full rounded-md border p-4 text-lg placeholder:text-[#4f4f4f] focus:outline-none active:outline-none"
					v-model="credential.email"
					placeholder="username" />
			</div>
			<div class="flex w-full flex-col gap-2">
				<label class="w-full text-[#b3b3b3]"> Password </label>
				<input
					type="password"
					class="bg-lightgray border-lightgray h-12 w-full rounded-md border p-4 text-lg placeholder:text-[#4f4f4f] focus:outline-none active:outline-none"
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
				class="w-fit rounded-lg bg-blue-500 py-4 px-8"
				v-on="
					mode === 'login'
						? { click: () => signIn($event) }
						: { click: () => signUp($event) }
				">
				{{ mode === 'login' ? 'Login' : 'Sign Up' }}
			</button>
		</div>
	</App>
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
		const error = userSignUp(credential.email, credential.password);

		console.log('error', error);
	};

	const signIn = async (event: Event) => {
		const error = userSignIn(credential.email, credential.password);

		console.log('error', error);
	};
</script>
