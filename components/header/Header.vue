<template>
	<div
		class="bg-secondary flex h-fit w-full flex-row items-center justify-center p-2">
		<div class="flex w-full max-w-3xl items-center justify-between gap-4">
			<div
				class="flex items-center gap-4 hover:cursor-pointer"
				@click="navigateTo('/notes')">
				<Icon
					class="text-blue-500"
					name="fa6-solid:book-open" />
				<p class="text-xl font-bold"> Notes </p>
			</div>
			<div class="flex w-fit justify-end">
				<Icon
					class="bg-secondary rounded-full hover:cursor-pointer"
					@click="navigateTo('/profile')"
					name="fa6-solid:circle-user"
					size="36" />
			</div>
		</div>
	</div>
</template>
