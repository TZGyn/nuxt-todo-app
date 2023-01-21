<template>
	<div class="app">
		<Header />

		<button @click="signout">Sign Out</button>

		<div class="content">
			<div v-if="data">
				<div v-for="note in data.notes">
					<LazyCardNote
						:id="note.id"
						:title="`hello`"
						:description="note.description" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	const router = useRouter();
	const supabase = useSupabaseAuthClient();

	const { data: data } = await useFetch('/api/notes');

	const signout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) return error;

		router.push('/');
	};

	onMounted(() => {});
</script>

<style scoped></style>
