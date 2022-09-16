<template>
	<div>
		<HeaderSectionAfter></HeaderSectionAfter>
		<div class="pb-10 z-10 relative">
			<div class="bg-[url('/images/bg.jpg')] font-[inkfree]">
			
			<div class="container mx-auto pb-10 text-center font-[inkfree] text-xl lg:text-2xl">
				<Title>Děkujeme</Title>
				<div class="px-4">Přesně před {{days_to_wedding}} dny jsme společně strávili zatím ten nejkrásnější den v našem životě. Rádi bychom za něj touto formou ještě jednou poděkovali. Děkujeme za spousty svatebních dárků, za srdečná přání, za nezapomenutelné zážitky a za dokonalé taneční kreace provázející většinu večera. Především vám ale děkujeme za to, že jste ten den tam byli s námi. Vaše přítomnost pro nás znamenala neuvěřitelně moc. </div>
				<br>
				<div class="px-4">Obrovský dík zvlášť patří rodičům, prarodičům, sourozencům, kamarádům a všem, kteří kvůli nám obětovali i spoustu času při přípravě a průběhu celé svatby.  </div>
				<br>
				<Title>Reference</Title>
				<div class="px-4"> Za skvěle odvedenou práci by jsme se chtěli odvděčit alespoň malou zmínkou zde na naší stránce. Všechny vás proto prosíme o chvilinku času k prohlédnutí těchto profilů a jejich podpoření likem/follow/sdílením. Děkujeme! 
					
					<ul class="mt-16">
						<li  class="text-3xl mb-4">Výzdoba a atmosféra svatby - Peťa <a class="underline text-blue-500" href="https://www.instagram.com/petrus_dilna/?hl=cs">@petrus_dilna</a> </li>
						<li  class="text-3xl mb-4">Motýlky, výrobky ze dřeva - Josefína <a class="underline text-blue-500" href="https://www.instagram.com/james_wood_lab/?hl=cs">@james_wood_lab</a> </li>
						<li  class="text-3xl mb-4">Šaty na míru pro svědkyni - Verunka <a class="underline text-blue-500" href="https://www.instagram.com/satenky/?hl=cs">@satenky</a> </li>
						<li  class="text-3xl mb-4">Dokonalé fotky - Kryštof <a class="underline text-blue-500" href="https://www.instagram.com/kryspinphoto/?hl=cs">@kryspinphoto</a> </li>
					</ul>

				</div>
				<Title class="-mb-5" id="fotky">Fotky</Title>
				<div class="px-4">					
					<div class="text-3xl mb-4">Svatbení video-prezentaci můžete shlédnout  <a class="underline text-blue-500" href="https://slide.kryspin.cz/ondra-a-hanka-chlum-okrisky/">zde</a> </div>
					<br>
					<div class="text-3xl mb-2">Online galerii pak můžete navštívit <a class="underline text-blue-500" href="https://galerie.kryspin.cz/-svatbaondrahankaorisky">přes tento odkaz</a> </div>
					<div class="text-3xl mb-4">Heslo ke galerii: <i>hornismrcne</i></div>
				</div>
				
				<div class="text-1xl mt-20 mb-4">
					<router-link class="underline text-blue-500" to="/pred_svatbou" >Původní verze stránky</router-link>
				</div>
				
			</div>
		</div>
		</div>
	</div>
</template>

<script setup>
import HeaderSectionAfter from "./../components/HeaderSectionAfter.vue";
import Title from "./../components/Title.vue";
import { ref } from "vue";

function days_between(date1, date2) {
	// The number of milliseconds in one day
	const ONE_DAY = 1000 * 60 * 60 * 24;

	// Calculate the difference in milliseconds
	const differenceMs = Math.abs(date1 - date2);

	// Convert back to days and return
	return Math.round(differenceMs / ONE_DAY);
}

let days_to_wedding = ref();
let date1 = new Date();
let date2 = new Date("2022-08-27");
days_to_wedding.value = Math.abs(days_between(date1, date2));


</script>
