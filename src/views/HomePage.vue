<template>
	<v-app>
		<v-main>
			<HeaderSection></HeaderSection>
			<div class="tw-pb-10">
				
				<Map></Map>
				
				<!-- <v-container> -->
				<ConfirmationForm class="tw-max-w-5xl tw-py-8 tw-px-5  tw-m-auto"></ConfirmationForm>
				<!-- </v-container> -->
			</div>
		</v-main>
	</v-app>
</template>

<script setup>
import ConfirmationForm from "./../components/ConfirmationForm.vue";
import HeaderSection from "./../components/HeaderSection.vue";
import Map from "./../components/Map.vue";
import {ref} from "vue";


// let mapSvg = require('./../assets/map/mapa_vsechno.svg')
</script>
