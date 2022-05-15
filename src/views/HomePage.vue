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
					<Title>Q&A</Title>
					<div class="px-4">
						<div class="tw-text-3xl tw-mb-4"><b>Jak se můžu dopravit na sraz k nevěstě do Horního Smrčného?</b></div>			
						<div>Na sraz se každý dopraví vlastní cestou. Na parkování bude místa dost. Můžete dojet i vlakem <a class="tw-underline tw-text-blue-500" href="https://idos.idnes.cz/vlakyautobusymhdvse/spojeni/prehled/?p=Fyb5SSWpsOpfNdTbad2ENK5UbPC5ckqikZtrmBdMqBI1GDvK1bglAtBH7vVJYPx72YFcRMS6PfNli5xjWUTM1w--">z Třebíče do Přímělkova</a> odkud už jsme schopní po předchozí domluvě zařídit dovoz.</div>			
						<div class="tw-text-3xl tw-mb-4 tw-mt-10"><b>Můžu nechat auto v Horním Smrčném a využít odtud autobus?</b></div>			
						<div>Určite! S tím se tak nějak počítá. Auto si pak vyzvednete následující den. Ideálně ale auto vůbec neberte a dojeďte vlakem 😊 (viz odpověď výše).</div>			
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
