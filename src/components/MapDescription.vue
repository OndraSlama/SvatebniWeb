<template>
	<div @mouseenter="expanded = true" @mouseleave="expanded=false" class="tw-transition-[max-height,transform] tw-overflow-clip tw-ease-in-out tw-shadow-md hover:tw-shadow-xl hover:tw--translate-y-1 tw-max-h-[200px] hover:tw-max-h-[300px] tw-max-w-[500px] lg:tw-w-[250px] xl:tw-w-[400px] lg:tw-left-1/2 lg:tw-absolute tw-p-4 tw-backdrop-blur-sm tw-bg-white/40 tw-text-lg tw-font-[InkFree]">
		<slot :expanded="expanded"></slot>
		<div v-if="expandable && !expanded" class="tw-text-center tw-text-4xl"> ... </div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  expandable: {
    type: Boolean,
    default: true
  }
})
const expanded = ref(false);

</script>

<style></style>
