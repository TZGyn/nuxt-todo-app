<template>
	<App>
		<Header />
		<div class="flex w-full max-w-3xl justify-end gap-4">
			<ElementButton
				@click="userSignOut()"
				class="hover:bg-red-500 hover:text-black">
				<Icon name="fa6-solid:arrow-right-from-bracket" />
			</ElementButton>
			<ElementButton
				class="hover:bg-blue-500 hover:text-black"
				@click="create()">
				<Icon
					v-if="isCreating"
					name="loading" />
				<Icon
					v-if="!isCreating"
					name="fa6-solid:square-plus" />
			</ElementButton>
		</div>

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

	onMounted(() => {
		refresh();
	});
</script>
