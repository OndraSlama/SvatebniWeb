<template>
	<v-app>
		<v-main>
			<HeaderSection></HeaderSection>
			<div class="tw-pb-10">
			<div class="tw-bg-[url('/images/bg.jpg')] tw-font-[inkfree]">						
				<Map></Map>
			</div>
				<div class="tw-container tw-mx-auto tw-text-center tw-font-[inkfree] tw-text-xl lg:tw-text-2xl">
					<Title>Dary</Title>
					<div class="px-4">
						Vezměte toto oznámení jako malou radu, že svatba není o trápení, co dát ke svatebnímu daru. Pokud něčím přispějete, budeme za to rádi, mnohem důležitější však pro nás bude, že strávíte tento den s námi.			
					</div>
					<ConfirmationForm class="tw-max-w-5xl tw-py-8 tw-px-5  tw-m-auto"></ConfirmationForm>
				</div>
				
				<!-- <v-container> -->
				<!-- </v-container> -->
			</div>
		</v-main>
	</v-app>
</template>

<script setup>
import ConfirmationForm from "./../components/ConfirmationForm.vue";
import HeaderSection from "./../components/HeaderSection.vue";
import Map from "./../components/Map.vue";
import Title from "./../components/Title.vue";
import {ref} from "vue";


// let mapSvg = require('./../assets/map/mapa_vsechno.svg')
</script>
