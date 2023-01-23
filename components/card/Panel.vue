<template>
	<div
		class="panel"
		:class="props.mode === 'horizontal' ? 'flex-row' : 'flex-col'">
		<div class="top">
			<Icon
				:name="props.icon"
				size="24" />
			<div class="title">
				{{ props.title }}
			</div>
		</div>
		<div class="middle">
			<div class="data">
				{{ props.data }}
			</div>
		</div>
		<div class="bottom"> </div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		mode: 'horizontal' | 'vertical';
		icon: string;
		title: string;
		description?: string;
		data: string | number;
	}

	const props = defineProps<Props>();
</script>

<style scoped>
	.panel {
		@apply bg-secondary flex h-fit w-full justify-start gap-8 p-4 text-center;
	}
	.top {
		@apply flex flex-row items-center justify-start gap-4;
	}
	.middle {
		@apply flex flex-row items-center gap-4;
	}
	.bottom {
		@apply flex flex-row items-center gap-4;
	}
	.title {
		@apply text-2xl font-bold;
	}
	.data {
		@apply text-2xl font-bold;
	}
</style>
