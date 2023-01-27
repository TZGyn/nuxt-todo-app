<template>
	<div class="app">
		<Header />

		<button @click="signout">Sign Out</button>
		<button @click="create">
			<LoadingSpinner v-if="isCreating" />
			<Icon
				v-if="!isCreating"
				name="fa6-solid:square-plus"
				size="24" />
		</button>

		<div class="content">
			<div
				v-if="data"
				class="notes">
				<div v-for="note in data.notes">
					<LazyCardNote
						:id="note.id"
						:title="note.title ? note.title : 'untitled'"
						:description="note.description" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { title } from 'process';

	definePageMeta({
		middleware: ['auth'],
	});

	const router = useRouter();
	const supabase = useSupabaseAuthClient();
	const isCreating = ref<boolean>(false);

	const { data: data, refresh } = await useFetch('/api/notes');

	const create = async () => {
		isCreating.value = true;
		await useFetch('/api/note/new', {
			onResponse({ response }) {
				isCreating.value = false;
				router.push(`/notes/${response._data.note.id}`);
			},
		});
	};

	const signout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) return error;

		router.push('/');
	};

	onMounted(() => {
		refresh();
	});
</script>

<style scoped>
	.notes {
		@apply flex flex-col gap-4;
	}
</style>
