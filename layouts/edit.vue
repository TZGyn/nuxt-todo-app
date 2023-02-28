<template>
	<div class="flex w-full flex-col items-center">
		<Header />

		<div class="flex w-full max-w-3xl flex-col py-8">
			<slot name="content" />
		</div>
	</div>
</template>
