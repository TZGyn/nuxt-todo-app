<template>
	<div
		class="note"
		@click="noteDetail(props.id)">
		<div class="title">
			{{ props.title }}
		</div>
		<div>
			{{ props.description }}
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		id: string | number;
		title: string;
		description: string;
	}

	const props = defineProps<Props>();
	const router = useRouter();

	const noteDetail = (id: string | number) => {
		router.push(`/notes/${id}`);
	};
</script>

<style scoped>
	.note {
		@apply bg-secondary flex w-96 cursor-pointer flex-col gap-4 rounded-lg p-4;
	}

	.title {
		@apply w-full text-center text-2xl font-bold;
	}
</style>
