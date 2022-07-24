<template>
	<div @mouseenter="set_expanded" @click="set_expanded" @mouseleave="unset_expanded" :class="classes">
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
const classes = computed(() => {
	let c = [
			"transition",
			"overflow-clip",
			"ease-in-out",
			"shadow-md",
			"rounded-lg",
			"w-full",
			"lg:w-[250px]",
			"xl:w-[400px]",
			"lg:left-1/2",
			"lg:absolute",
			"p-4",
			"backdrop-blur-sm",
			"bg-white/30",
			"text-lg"
		]
		if (expanded.value) {
			c.push("shadow-xl");
			c.push("-translate-y-1");
			c.push("z-50");
			c.push("bg-white/70");
		}
		return c
}
);

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
