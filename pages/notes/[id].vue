<template>
	<App class="p-4">
		<ClientOnly>
			<ElementTextArea
				@keydown.ctrl.s.prevent="submit(note)"
				v-model="note.title"
				placeholder="untitled"
				class="bg-primary focus:bg-secondary text-center" />
			<div class="menu">
				<button @click="submit(note)">
					<Icon
						v-if="isSubmitting"
						name="loading" />
					<Icon
						v-if="!isSubmitting"
						name="fa6-solid:floppy-disk" />
				</button>
				<button @click="deleteNote">
					<Icon
						v-if="isDeleting"
						name="loading" />
					<Icon
						v-if="!isDeleting"
						name="fa6-solid:trash" />
				</button>
			</div>
			<ElementTextArea
				@keydown.ctrl.s.prevent="submit(note)"
				v-model:model-value="note.description"
				class="h-full p-4" />
		</ClientOnly>
	</App>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	const note = reactive<Note>({
		title: '',
		description: '',
	});
	const route = useRoute();
	const router = useRouter();
	const isLoading = ref<Boolean>(false);
	const isSubmitting = ref<Boolean>(false);
	const isDeleting = ref<Boolean>(false);

	const { refresh } = await useFetch('/api/note', {
		method: 'GET',
		query: {
			id: route.params.id,
		},
		onResponse({ response }) {
			console.log('Response: ', response);
			if (response.status === 500) {
				console.log(`Error: ${response._data.message}`);
				router.push('/notes');
				return;
			}
			note.title = response._data.note.title;
			note.description = response._data.note.description;
		},
	});

	const submit = async (note: Note) => {
		isSubmitting.value = true;
		await useFetch('/api/note', {
			method: 'POST',
			query: {
				id: route.params.id,
			},
			body: {
				title: note.title,
				description: note.description,
			},
			onResponse({ response }) {
				isSubmitting.value = false;
				console.log('POST:', response._data.message);
			},
		});
	};

	const deleteNote = async () => {
		isDeleting.value = true;
		await useFetch('/api/note', {
			method: 'DELETE',
			query: {
				id: route.params.id,
			},
			onResponse({ response }) {
				isDeleting.value = false;
				console.log('DELETE:', response._data.message);
				router.push('/notes');
			},
		});
	};

	onMounted(() => {
		isLoading.value = true;
		refresh();
		isLoading.value = false;
	});
</script>
