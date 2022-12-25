<template>
	<div class="app">
		<Header />

		<div class="content">
			<div v-for="note in data?.notes">
				<LazyCardNote />
			</div>
		</div>
		{{ data }}

		<button @click="signout">Sign Out</button>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	const router = useRouter();
	const supabase = useSupabaseAuthClient();
	const user = useSupabaseUser();

	interface FetchOption {
		key?: string;
		headers: Record<'cookie', string | undefined>;
	}

	onMounted(() => {
		console.log(user.value);
	});

	const fetchOption: FetchOption = {
		key: user.value?.id,
		headers: useRequestHeaders(['cookie']),
	};

	const { data: data } = await useFetch('/api/notes', fetchOption);

	const signout = async () => {
		const { error } = await supabase.auth.signOut();
		router.push('/');
	};
</script>

<style scoped></style>
