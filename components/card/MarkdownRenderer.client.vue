<script setup lang="ts">
	interface Props {
		content: string
	}

	const props = defineProps<Props>()
	const parsedMarkdown = stringToMarkdown(props.content)
</script>

<template>
	<div class="h-content bg-secondary overflow-y-scroll p-4">
		<div
			class="prose prose-invert overflow-scroll"
			v-html="parsedMarkdown">
		</div>
	</div>
</template>
