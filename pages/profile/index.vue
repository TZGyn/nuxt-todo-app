<template>
	<div class="app">
		<Header />
		<div class="dashboard">
			<CardPanel
				v-for="data in dashboardData"
				:mode="data.mode"
				:icon="data.icon"
				:title="data.title"
				:description="data.description"
				:data="data.data" />
		</div>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	interface DashboardData {
		noteCount: {
			title: string;
			description: string;
			data: number;
			mode: 'horizontal' | 'vertical';
			icon: string;
		};
	}

	const isLoading = ref<boolean>(true);

	const dashboardData: DashboardData = reactive({
		noteCount: {
			title: 'Note Count',
			description: 'The number of notes this account is currently having',
			data: 0,
			mode: 'horizontal',
			icon: 'fa6-solid:note-sticky',
		},
	});

	const { data: data, refresh } = await useFetch('/api/profile', {
		onResponse({ response }) {
			dashboardData.noteCount.data = response._data.count;
		},
	});

	onMounted(() => {
		isLoading.value = true;
		refresh();
		isLoading.value = false;
	});
</script>

<style scoped>
	.dashboard {
		@apply w-full max-w-3xl;
	}
</style>
