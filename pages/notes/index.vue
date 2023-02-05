<template>
	<App>
		<Header />

		<button @click="signout">Sign Out</button>
		<button @click="create">
			<Icon
				v-if="isCreating"
				name="loading" />
			<Icon
				v-if="!isCreating"
				name="fa6-solid:square-plus" />
		</button>

		<div
			class="mx-12 flex h-full w-full max-w-3xl flex-row justify-center gap-4">
			<div
				v-if="data"
				class="flex flex-col gap-4">
				<div v-for="note in data.notes">
					<LazyCardNote
						:id="note.id"
						:uuid="note.uuid"
						:title="note.title ? note.title : 'untitled'"
						:description="note.description" />
				</div>
			</div>
		</div>
	</App>
</template>

<script setup lang="ts">
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
				console.log(response._data.message);
				isCreating.value = false;
				router.push(`/notes/${response._data.note.uuid}`);
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
