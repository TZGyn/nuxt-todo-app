<script setup lang="ts">
	interface Props {
		content: string
		state: string
	}

	const props = defineProps<Props>()

	const description = useDescription()
	const parsedMarkdown = computed(() => {
		return stringToMarkdown(description.value)
	})
</script>

<template>
	<div class="bg-secondary h-full w-full overflow-y-scroll p-4">
		<div
			class="prose prose-invert h-full max-h-full"
			v-html="parsedMarkdown">
		</div>
	</div>
</template>
