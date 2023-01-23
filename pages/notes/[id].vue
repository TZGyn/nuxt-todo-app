<template>
	<div class="app">
		<textarea
			v-model="title"
			class="titleTextArea" />
		<button @click="submit()">
			<Icon
				name="fa6-solid:floppy-disk"
				size="24" />
		</button>
		<textarea
			v-model="description"
			class="noteTextArea"></textarea>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	const title = ref<string>('');
	const description = ref<string>('');
	const route = useRoute();
	const isLoading = ref<Boolean>(false);
	const isSubmitting = ref<Boolean>(false);

	const { refresh } = await useFetch('/api/note', {
		method: 'GET',
		query: {
			id: route.params.id[0],
		},
		onResponse({ response }) {
			title.value = response._data.note.title;
			description.value = response._data.note.description;
			console.log(response);
		},
	});

	const submit = async () => {
		isSubmitting.value = true;
		await useFetch('/api/note', {
			method: 'POST',
			query: {
				id: route.params.id[0],
			},
			body: {
				title: title.value,
				description: description.value,
			},
			onResponse({ response }) {
				console.log('POST:', response._data.message);
			},
		});
		isSubmitting.value = false;
	};

	onMounted(() => {
		isLoading.value = true;
		refresh();
		isLoading.value = false;
	});
</script>

<style scoped>
	.noteTextArea {
		@apply h-full w-full max-w-2xl p-4;
	}
	.titleTextArea {
		@apply bg-primary focus:bg-secondary w-full max-w-2xl text-center;
	}
	.app {
		@apply h-full p-4;
	}
</style>
