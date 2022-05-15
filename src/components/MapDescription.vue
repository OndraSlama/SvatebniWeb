<template>
	<div @mouseenter="expanded = true" @mouseleave="expanded = false" :class="classes">
		<slot :expanded="expanded"></slot>
		<!-- <div v-if="expandable && !expanded" class="tw-text-center tw-text-4xl tw-bg">...</div> -->
	</div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
	expandable: {
		type: Boolean,
		default: true,
	},
});

const expanded = ref(false);
const classes = computed(() => [
		"tw-transition",
		"tw-overflow-clip",
		"tw-ease-in-out",
		"tw-shadow-md",
		"hover:tw-shadow-xl",
		"hover:tw--translate-y-1",
		"hover:tw-z-50",
		"tw-w-full",
		"lg:tw-w-[250px]",
		"xl:tw-w-[400px]",
		"lg:tw-left-1/2",
		"lg:tw-absolute",
		"tw-p-4",
		"tw-backdrop-blur-sm",
		"tw-bg-white/30",
		"hover:tw-bg-white/70",
		"tw-text-lg",
		"tw-font-[InkFree]"
		]);
</script>

<style>
</style>
