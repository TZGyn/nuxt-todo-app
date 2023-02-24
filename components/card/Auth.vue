<template>
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
			v-if="mode === 'login'"
			class="cursor-pointer text-blue-500 underline">
			Don't have an account? Sign up
		</p>
		<p
			v-if="mode === 'signup'"
			class="cursor-pointer text-blue-500 underline">
			Already have an account? Login
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
</template>

<script setup lang="ts">
	interface Props {
		mode: 'login' | 'signup'
	}

	interface Credential {
		email: string
		password: string
		name?: string
	}

	const credential: Credential = reactive({
		email: '',
		password: '',
	})

	const props = withDefaults(defineProps<Props>(), {
		mode: 'login',
	})

	const supabase = useSupabaseAuthClient()

	const signUp = async (event: Event) => {
		const { data: user, error } = await supabase.auth.signUp({
			email: credential.email,
			password: credential.password,
		})
		console.log('user', user)
		console.log('error', error)
	}

	const signIn = async (event: Event) => {
		const { data: user, error } = await supabase.auth.signInWithPassword({
			email: credential.email,
			password: credential.password,
		})
		console.log('user', user)
		console.log('error', error)
	}
</script>
