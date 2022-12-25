<template>
	<div class="app">
		<Header />
		{{ user?.email }}
		<NuxtLink to="/notes"> Notes </NuxtLink>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		middleware: ['auth'],
	});

	const router = useRouter();
	const user = useSupabaseUser();

	watch(
		() => user.value,
		() => {
			if (user.value) {
				router.push('/notes');
			}
		}
	);
</script>
