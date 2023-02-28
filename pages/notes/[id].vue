<template>
	<NuxtLayout
		name="edit"
		@keydown.ctrl.s.prevent="submit(note)">
		<template #content>
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
			<div class="flex h-full w-full flex-col">
				<textarea
					ref="noteTextArea"
					v-show="comp === 'text'"
					class="bg-secondary h-fit w-full flex-grow resize-none border-none p-4 outline-none placeholder:text-zinc-700 focus:outline-none"
					@input="resizeNoteTextArea()"
					v-model="note.description">
				</textarea>
				<CardMarkdownRenderer
					v-show="comp === 'md'"
					:content="note.description"
					:state="'description'" />
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	})

	type Comp = 'text' | 'md'

	const note = useNote()
	const route = useRoute()
	const router = useRouter()
	const isLoading = ref<Boolean>(false)
	const isSubmitting = ref<Boolean>(false)
	const isDeleting = ref<Boolean>(false)
	const comp = ref<Comp>('text')
	const noteTextArea = ref()
	const description = useDescription()

	const resizeNoteTextArea = () => {
		noteTextArea.value.style.height = '18px'
		noteTextArea.value.style.height = noteTextArea.value.scrollHeight + 'px'
	}

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
			note.value.title = response._data.note.title
			note.value.description = response._data.note.description
			description.value = note.value.description
			resizeNoteTextArea()
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

	watch(
		() => note.value.description,
		() => {
			description.value = note.value.description
		}
	)
</script>
