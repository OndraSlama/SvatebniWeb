<template>
	<div class="tw-bg-[url('/images/bg.jpg')]">
		<h1 class="tw-text-7xl tw-text-center tw-py-12 tw-font-[hobbiton]">Program</h1>

		<div class="tw-flex tw-relative tw-justify-center tw-py-10 tw-px-4">
			<MapDescription class="tw-w-[250px] tw-top-0 tw-left-1/2 tw-ml-[-500px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut aperiam debitis dolorum distinctio corporis quisquam assumenda ducimus sapiente illo. Nihil obcaecati atque sint ea labore veritatis consectetur in beatae qui? </MapDescription>

			<MapDescription class="tw-w-[250px] tw-top-[50px] tw-left-1/2 tw-ml-[300px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. </MapDescription>

			<img src="./../assets/map/mapa_vsechno.svg" />
		</div>
	</div>
</template>

<script setup>
import MapDescription from "./../components/MapDescription.vue";
import {ref} from "vue";
const showSmrcne = ref(false);
</script>

<style></style>
