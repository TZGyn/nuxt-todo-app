<template>
	<div class="header">
		<img
			class="avatar"
			:src="avatar"
			alt="" />
	</div>
</template>

<script setup lang="ts">
	interface Props {
		avatar?: string;
	}

	const props = withDefaults(defineProps<Props>(), {
		avatar: 'https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png',
	});
</script>

<style scoped>
	.header {
		@apply bg-secondary my-3 flex h-16 w-full max-w-3xl flex-row items-center justify-center rounded-lg;
	}

	.avatar {
		@apply bg-secondary h-12 w-12 rounded-full;
	}
</style>
