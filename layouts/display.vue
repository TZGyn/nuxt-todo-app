<template>
	<App>
		<Header />

		<div class="flex w-full max-w-3xl flex-col gap-4">
			<slot name="content" />
		</div>
	</App>
</template>

<script setup lang="ts"></script>
