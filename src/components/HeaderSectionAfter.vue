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
							<div>Slámovi</div>
						</div>

						<h3 class="text-5xl md:text-7xl">27.8.2022</h3>
					</div>
					<div class="text-center mt-10">
						<router-link to="#fotky" class="transition py-3 px-5 font-[InkFree] backdrop-blur-sm bg-white/30 hover:bg-white/80 rounded-md text-3xl"> <b>Prohlédnout fotky</b></router-link>
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
		return "https://i.ibb.co/0Qjdc5N/Chlum-Okrisky-svatba-Hanka-Ondra-barevna-varianta-fotograf-Krystof-Novak-2022-551-websize.jpg";
	} else {
		return "https://i.ibb.co/GVqvTn9/Chlum-Okrisky-svatba-Hanka-Ondra-barevna-varianta-fotograf-Krystof-Novak-2022-545-websize.jpg";
	}
});
</script>

<style></style>
