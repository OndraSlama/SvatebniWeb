<template>
	<div @mouseenter="set_expanded" @mouseleave="unset_expanded" :class="classes">
		<slot :expanded="expanded"></slot>
		<!-- <div v-if="expandable && !expanded" class="text-center text-4xl bg">...</div> -->
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
		"transition",
		"overflow-clip",
		"ease-in-out",
		"shadow-md",
		"rounded-lg",
		"hover:shadow-xl",
		"hover:-translate-y-1",
		"hover:z-50",
		"w-full",
		"lg:w-[250px]",
		"xl:w-[400px]",
		"lg:left-1/2",
		"lg:absolute",
		"p-4",
		"backdrop-blur-sm",
		"bg-white/30",
		"hover:bg-white/70",
		"text-lg"		
		]);

const unset_expanded = () => {
	setTimeout(() => {
		expanded.value = false;
	}, 120);
}

const set_expanded = () => {
	expanded.value = true;
}
</script>

<style>
</style>
