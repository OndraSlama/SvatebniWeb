<template>
	<div class="z-0 relative h-[100vh] w-full font-[hobbiton]">
		<scroll-parallax :speed="0.6">
			<img class="h-[100vh] w-full object-cover object-top" :src="image_source" />
		</scroll-parallax>
		<!-- <div class="z-0 relative h-[100vh] w-full  object-top bg-[url('/public/images/hero_image.jpg')]"></div> -->
			<div class="absolute top-0 flex w-full h-[100vh]">
				<div class="text-center self-center w-full">
					<div class="pt-10 pb-6 backdrop-blur-sm bg-white/30">
						<div class="mb-10 text-8xl md:text-9xl flex lg:gap-8 justify-center flex-col lg:flex-row">
							<div>Hana</div>
							<div>&</div>
							<div>Ondra</div>
						</div>

						<h3 class="text-5xl md:text-7xl">27.8.2022</h3>
					</div>
					<div class="text-center mt-10">
						<router-link to="#potvrzeni" class="transition py-3 px-5 font-[InkFree] backdrop-blur-sm bg-white/30 hover:bg-white/80 rounded-md text-3xl"> <b>Potvrdit účast</b></router-link>
					</div>
				</div>
			</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import ScrollParallax from "vue3-parallax/src/components/ScrollParallax.vue";

let windowWidth = ref(window.innerWidth);
console.log(windowWidth.value);
const image_source = computed(() => {
	if (windowWidth.value > 768) {
		return "/public/images/hero_image.jpg";
	} else {
		return "/public/images/hero_image_mobile.jpg";
	}
});
</script>

<style></style>
