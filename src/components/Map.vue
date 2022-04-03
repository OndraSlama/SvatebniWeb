<template>
	<div class="tw-bg-[url('/images/bg.jpg')] tw-font-[inkfree]">
		
		<Title>Program</Title>
		<!-- <div class="tw-text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut aperiam debitis dolorum distinctio corporis quisquam assumenda ducimus sapiente illo.</div> -->

		<div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-3 tw-relative tw-justify-center tw-items-center tw-pb-16 tw-px-4">
			<MapDescription class="tw-max-w-[500px] lg:tw-w-[250px] lg:tw-top-0 lg:tw-left-1/2 lg:tw-ml-[-500px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut aperiam debitis dolorum distinctio corporis quisquam assumenda ducimus sapiente illo. Nihil obcaecati atque sint ea labore veritatis consectetur in beatae qui? </MapDescription>

			<MapDescription class="tw-max-w-[500px] lg:tw-w-[250px] lg:tw-top-[50px] lg:tw-left-1/2 lg:tw-ml-[300px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. </MapDescription>
			<div class="tw-flex tw-justify-center">
				<img class="max-w-[300px] tw-hidden lg:tw-block" src="./../assets/map/mapa.svg" />
				<img class="max-w-[300px] lg:tw-hidden" src="./../assets/map/mapa_mobil.svg" />
			</div>
		</div>
	</div>
</template>

<script setup>
import MapDescription from "./../components/MapDescription.vue";
import Title from "././../components/Title.vue";
import {ref} from "vue";
const showSmrcne = ref(false);
</script>

<style></style>
