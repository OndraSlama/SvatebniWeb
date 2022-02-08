<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
	<div>
		<h1>Counter</h1>
		{{ count }}
		<button @click="count++">Increment</button>
	</div>
</template>
