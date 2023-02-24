<template>
	<NuxtLayout name="display">
		<template #content>
			<CardPanel
				v-for="data in dashboardData"
				:key="data.title"
				:mode="data.mode"
				:icon="data.icon"
				:title="data.title"
				:description="data.description"
				:data="data.data" />

			<div class="flex gap-4">
				<button
					v-if="user"
					@click="userSignOut()"
					class="w-fit rounded-md p-2 font-bold transition duration-500 ease-out hover:bg-red-500 hover:text-black">
					<Icon name="fa6-solid:arrow-right-from-bracket" />
					Sign Out
				</button>
				<button
					v-else
					@click="router.push('/login')"
					class="w-fit rounded-md p-2 font-bold transition duration-500 ease-out hover:bg-blue-500 hover:text-black">
					<Icon name="fa6-solid:arrow-right-to-bracket" />
					Log In
				</button>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	})

	interface DashboardData {
		noteCount: {
			title: string
			description: string
			data: number
			mode: 'horizontal' | 'vertical'
			icon: string
		}
	}

	const router = useRouter()
	const user = useSupabaseUser()
	const isLoading = ref<boolean>(true)

	const dashboardData: DashboardData = reactive({
		user: {
			title: 'Email',
			description: 'User',
			data: user.value?.email,
			mode: 'horizontal',
			icon: 'fa6-solid:envelope',
		},
		noteCount: {
			title: 'Note Count',
			description: 'The number of notes this account is currently having',
			data: 0,
			mode: 'horizontal',
			icon: 'fa6-solid:note-sticky',
		},
	})

	const { refresh } = await useFetch('/api/profile', {
		onResponse({ response }) {
			dashboardData.noteCount.data = response._data.count
		},
	})

	onMounted(() => {
		isLoading.value = true
		refresh()
		isLoading.value = false
	})
</script>
