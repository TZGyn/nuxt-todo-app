<template>
	<div
		class="bg-secondary my-3 flex h-16 w-full max-w-3xl flex-row items-center justify-center rounded-lg">
		<div @click="profile">
			<img
				v-if="props.avatar"
				class="bg-secondary h-12 w-12 rounded-full hover:cursor-pointer"
				@click="profile"
				:src="props.avatar"
				alt="" />
			<Icon
				v-else
				class="bg-secondary h-12 w-12 rounded-full hover:cursor-pointer"
				name="fa6-solid:circle-user" />
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		avatar?: string;
	}

	const props = defineProps<Props>();

	const router = useRouter();

	const profile = () => {
		router.push('/profile');
	};
</script>
