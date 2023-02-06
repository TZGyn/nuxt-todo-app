<template>
	<App>
		<Header />
		<NuxtLink to="/notes"> Notes </NuxtLink>
	</App>
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
