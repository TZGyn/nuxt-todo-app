<template>
	<div
		class="bg-secondary group/note flex w-full cursor-pointer flex-col gap-4 px-4 py-2"
		v-auto-animate
		@click="toggleDetail()">
		<div class="flex items-center">
			<div class="w-full text-center text-2xl font-bold">
				{{ props.title }}
			</div>
			<div class="flex flex-col">
				<ElementButton @click.stop="toggleOptions()">
					<Icon name="fa6-solid:ellipsis-vertical" />
				</ElementButton>
				<div
					class="relative"
					v-auto-animate>
					<div
						v-if="showOptions"
						@click="toggleOptions()">
						<div
							class="bg-secondary border-lightgray absolute right-0 top-0 z-50 flex h-fit w-64 flex-col border">
							<CardOptions
								name="View Note"
								@click.stop="noteDetail(props.uuid)" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="showDetail"
			class="pb-2">
			{{ props.description }}
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		id: string | number;
		uuid: string;
		title: string;
		description: string;
	}

	const props = defineProps<Props>();
	const showDetail = ref<boolean>(false);
	const showOptions = ref<boolean>(false);

	const toggleOptions = () => {
		showOptions.value = !showOptions.value;
	};

	const toggleDetail = () => {
		showDetail.value = !showDetail.value;
	};

	const noteDetail = (id: string) => {
		navigateTo(`/notes/${id}`);
	};
</script>
