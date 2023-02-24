<template>
	<App class="p-4">
		<div class="flex w-full max-w-2xl justify-end gap-4">
			<ElementButton
				class="hover:bg-blue-500 hover:text-black"
				@click="submit(note)">
				<Icon
					v-if="isSubmitting"
					name="loading" />
				<Icon
					v-if="!isSubmitting"
					name="fa6-solid:floppy-disk" />
			</ElementButton>
			<ElementButton
				class="hover:bg-red-500 hover:text-black"
				@click="deleteNote">
				<Icon
					v-if="isDeleting"
					name="loading" />
				<Icon
					v-if="!isDeleting"
					name="fa6-solid:trash" />
			</ElementButton>
		</div>
		<div class="h-full w-full max-w-2xl">
			<div class="flex w-full justify-between">
				<div
					@click="toggleComp('text')"
					class="bg-lightgray w-1/2 p-2 text-center text-xl"
					:class="{ 'bg-secondary': comp === 'text' }">
					Text
				</div>
				<div
					@click="toggleComp('md')"
					class="bg-lightgray w-1/2 p-2 text-center text-xl"
					:class="{ 'bg-secondary': comp === 'md' }">
					Markdown
				</div>
			</div>
			<textarea
				v-if="comp === 'text'"
				class="bg-secondary w-full resize-none border-none p-4 outline-none placeholder:text-zinc-700 focus:outline-none"
				v-model="note.description">
			</textarea>
			<CardMarkdownRenderer
				v-if="comp === 'md'"
				:content="note.description" />
		</div>
	</App>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	})

	type Comp = 'text' | 'md'

	const note = reactive<Note>({
		title: '',
		description: '',
	})
	const route = useRoute()
	const router = useRouter()
	const isLoading = ref<Boolean>(false)
	const isSubmitting = ref<Boolean>(false)
	const isDeleting = ref<Boolean>(false)
	const comp = ref<Comp>('text')

	const toggleComp = (name: Comp) => {
		comp.value = name
	}

	const { refresh } = await useFetch('/api/note', {
		method: 'GET',
		query: {
			id: route.params.id,
		},
		onResponse({ response }) {
			console.log('Response: ', response)
			if (response.status === 500) {
				console.log(`Error: ${response._data.message}`)
				router.push('/notes')
				return
			}
			note.title = response._data.note.title
			note.description = response._data.note.description
		},
	})

	const submit = async (note: Note) => {
		isSubmitting.value = true
		await submitNote(note, { id: route.params.id })
		isSubmitting.value = false
	}

	const deleteNote = async () => {
		isDeleting.value = true
		await useFetch('/api/note', {
			method: 'DELETE',
			query: {
				id: route.params.id,
			},
			onResponse({ response }) {
				isDeleting.value = false
				console.log('DELETE:', response._data.message)
				router.push('/notes')
			},
		})
	}

	onMounted(() => {
		isLoading.value = true
		refresh()
		isLoading.value = false
	})
</script>
