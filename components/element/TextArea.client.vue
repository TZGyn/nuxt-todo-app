<template>
	<textarea
		class="bg-secondary w-full max-w-2xl resize-none border-none outline-none placeholder:text-zinc-700 focus:outline-none"
		v-model="data"
		:rows="props.row"
		:placeholder="props.placeholder"
		@input="updateData()">
	</textarea>
</template>

<script setup lang="ts">
	interface Props {
		modelValue: string
		placeholder?: string
		row?: number
	}

	const props = defineProps<Props>()
	const emit = defineEmits(['update:modelValue'])

	const data = ref<string>(props.modelValue)

	const updateData = () => {
		emit('update:modelValue', data.value)
	}

	watch(
		() => props.modelValue,
		() => (data.value = props.modelValue)
	)
</script>
