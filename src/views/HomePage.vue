<template>
	<div>
		<HeaderSection></HeaderSection>
		<div class="pb-10 z-10 relative">
			<div class="bg-[url('/images/bg.jpg')] font-[inkfree]">
				<Map></Map>
			</div>
			<div class="container mx-auto text-center font-[inkfree] text-xl lg:text-2xl">
				<Title>Dary</Title>
				<div class="px-4">Vezměte toto oznámení jako malou radu, že svatba není o trápení, co dát ke svatebnímu daru. Pokud něčím přispějete, budeme za to rádi, mnohem důležitější však pro nás bude, že strávíte tento den s námi.</div>
				<Title>Q&A</Title>
				<div class="px-4">
					<div class="text-3xl mb-4"><b>Jak se můžeme dopravit na sraz k nevěstě do Horního Smrčného?</b></div>
					<div>Na sraz se každý dopraví vlastní cestou. Na parkování bude místa dost. Můžete dojet i vlakem <a class="underline text-blue-500" href="https://idos.idnes.cz/vlakyautobusymhdvse/spojeni/prehled/?p=Fyb5SSWpsOpfNdTbad2ENK5UbPC5ckqikZtrmBdMqBI1GDvK1bglAtBH7vVJYPx72YFcRMS6PfNli5xjWUTM1w--">z Třebíče do Přímělkova</a> odkud už jsme schopní po předchozí domluvě zařídit dovoz.</div>
					<div class="text-3xl mb-4 mt-10"><b>Můžeme nechat auto v Horním Smrčném a využít odtud autobus?</b></div>
					<div>Určite! S tím se tak nějak počítá. Auto si pak vyzvednete následující den. Ideálně ale auto vůbec neberte a dojeďte vlakem z Třebíče 😊 (viz odpověď výše).</div>
					<div class="text-3xl mb-4 mt-10"><b>Kde přesně je v Horním Smrčném sraz?</b></div>
					<div>Sejdeme se na dvorku u <a class="underline text-blue-500" href="https://maps.app.goo.gl/GTBUVDr1QL9sHb197">domu s č.p. 23</a>. Od točny autobusu, kde můžete nechat zaparkované auto, půjdete kousek nahoru do kopce po cestě. Tam už nás najdete.</div>
					<div class="text-3xl mb-4 mt-10"><b>Platí pozvání i pro partnera/děti?</b></div>
					<div>Ano. Pokud jste dostali pozvánku ke svatebnímu stolu, jsou srdečně vítání jak děti tak i vaše +1. Poprosíme jen o uvedení počtu hostů ve <router-link to="#potvrzeni" class="underline text-blue-500"> <b>formuláři níže</b></router-link>. </div>
					<div class="text-3xl mb-4 mt-10"><b>Platí nějaký dress code?</b></div>
					<div>Na ničem nelpíme. Přijďte v tom, v čem se budete cítit nejlépe Vy.</div>
					<div class="text-3xl mb-4 mt-10"><b>Kdo bude na svatbě hrát?</b></div>
					<div>Na svatbě nám zahraje kapela <a class="underline text-blue-500" href="https://www.blueband.cz/kapela-na-svatbu/">Blue Band</a>.</div>
				</div>
				<ConfirmationForm id="potvrzeni" class="max-w-5xl py-8 px-5 m-auto"></ConfirmationForm>
			</div>

			<!-- <v-container> -->
			<!-- </v-container> -->
		</div>
	</div>
</template>

<script setup>
import ConfirmationForm from "./../components/ConfirmationForm.vue";
import HeaderSection from "./../components/HeaderSection.vue";
import Map from "./../components/Map.vue";
import Title from "./../components/Title.vue";

import { ref } from "vue";

// let mapSvg = require('./../assets/map/mapa_vsechno.svg')
</script>
