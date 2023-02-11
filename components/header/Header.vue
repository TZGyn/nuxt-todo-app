<template>
	<div
		class="bg-secondary flex h-fit w-full flex-row items-center justify-center p-4">
		<div class="flex w-full max-w-3xl items-center justify-between">
			<div
				class="flex items-center gap-4 hover:cursor-pointer"
				@click="navigateTo('/notes')">
				<Icon
					class="text-blue-500"
					name="fa6-solid:book-open" />
				<p class="text-xl font-bold"> Notes </p>
			</div>
			<div
				class="flex w-full justify-end"
				@click="navigateTo('/profile')">
				<Icon
					class="bg-secondary rounded-full hover:cursor-pointer"
					name="fa6-solid:circle-user" />
			</div>
		</div>
	</div>
</template>
