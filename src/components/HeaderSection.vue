<template>
	<v-parallax scale="1.5" :src="image_source" class="tw-flex align-center tw-max-h-screen tw-min-h-screen">
			<div class="tw-text-center tw-font-[hobbiton] tw-pt-10 tw-pb-6 tw-backdrop-blur-sm tw-bg-white/30">
				<div class="tw-mb-10 tw-text-8xl md:tw-text-9xl tw-flex lg:tw-gap-8 tw-justify-center tw-flex-col lg:tw-flex-row ">
					<div>Hana</div>
					<div>&</div>
					<div>Ondra</div>
				</div>

				<h3 class="tw-text-5xl md:tw-text-7xl">27.8.2022</h3>
			</div>
			<div class="tw-text-center tw-mt-10">
				<router-link to="#potvrzeni" class="tw-transition tw-py-3 tw-px-5 tw-font-[InkFree] tw-backdrop-blur-sm tw-bg-white/30 hover:tw-bg-white/80 tw-rounded-md tw-text-3xl"> <b>Potvrdit účast</b></router-link>
			</div>
	</v-parallax>
</template>

<script setup>
import { ref, computed } from "vue";
let windowWidth = ref(window.innerWidth)
console.log(windowWidth.value);
const image_source = computed(() => {
	if (windowWidth.value > 768) {
		return "/public/images/hero_image.jpg";
	} else {
		return "/public/images/hero_image_mobile.jpg";
	}
});
</script>

<style>

</style>
