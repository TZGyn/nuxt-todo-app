<template>
	<div
		class="bg-secondary flex h-fit w-full justify-start gap-8 p-4 text-center"
		:class="props.mode === 'horizontal' ? 'flex-row' : 'flex-col'">
		<div class="flex flex-row items-center justify-start gap-4">
			<Icon :name="props.icon" />
			<div class="text-2xl font-bold">
				{{ props.title }}
			</div>
		</div>
		<div class="flex flex-grow flex-row items-center gap-4">
			<div class="w-full text-right text-2xl font-bold">
				{{ props.data }}
			</div>
		</div>
		<div class="flex flex-row items-center gap-4"> </div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		mode: 'horizontal' | 'vertical'
		icon: string
		title: string
		description?: string
		data: string | number
	}

	const props = defineProps<Props>()
</script>
