<template>
	<div class="hover:bg-lightgray flex h-12 w-full items-center p-4">
		{{ props.name }}
	</div>
</template>

<script setup lang="ts">
	interface Props {
		name: string;
	}

	const props = defineProps<Props>();
</script>
