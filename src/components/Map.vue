<template>
		
		<Title class="pt-16 lg:pt-32">Svatebni den</Title>
		<div class="hidden lg:block text-center text-3xl mt-[-50px] mb-10"> Najetím myší na jednotlivé sekce zobrazíš další info.</div>
		<div class="lg:hidden text-center text-xl mt-[-50px] mb-16"> Kliknutím na jednotlivé sekce zobrazíš další info.</div>
		<div class="flex flex-col lg:flex-row gap-3 relative justify-center items-center pb-16 lg:pt-10 px-4">
			<MapDescription v-slot="{expanded}" class="lg:mb-[780px] lg:ml-[-500px] xl:ml-[-680px]"> 

				<div class="text-3xl xl:text-4xl">Sraz v Horním Smrčném</div>
				<ul>
					<li  class="my-2 xl:text-xl"> <b>10:00 sraz u nevěsty</b></li>
					<li  v-if="expanded"> <b>Zdobení aut, Vývazkování svatebčanů, Něco malého k zakousnutí</b> </li>
				</ul>

				<div v-if="expanded">Obec Horní Smrčné je jedna z nejmenších vesniček na Vysočině. Co ji chybí do velikosti, rozhodně ji nechybí do krásy. Navzdory tomu, že nevěsta pochází z Přibyslavic, okouzlena malebností této vesničky již od dob, kdy zde u prarodičů trávila prázdniny, rozhodla se vydat na další životní etapu právě odsud.</div>
				
			</MapDescription>

			<MapDescription v-slot="{expanded}"  class="lg:mb-[820px] xl:top-[20py] lg:ml-[300px]"> 
				<div  class="text-3xl xl:text-4xl">
					Autobusem na obřad
				</div> 
				<ul>
					<li  class="my-2 xl:text-xl"> <b>11:30 společný přejezd na Chlum</b></li>
				</ul>
				<div v-if="expanded">
					Pro ty, kteří nedisponují vlastními auty nebo si rádi přihnou již před polednem, je vypraven na přejezd na obřad autobus
				</div>
			</MapDescription>

			<MapDescription v-slot="{expanded}" class="lg:mb-[150px] lg:ml-[250px]"> 
				<div  class="text-3xl xl:text-4xl">
					Obřad na Chlumě
				</div> 
				<ul>
					<li  class="my-2 xl:text-xl"> <b>12:00 obřad</b></li>
					<li  class="my-2 xl:text-xl"> <b>13:30 focení</b></li>
				</ul>
				<div  v-if="expanded">
					Přesně v poledne se se slibem, výměnou prstýků a stvrzením podpisem (snad postačí inkoust), novomanželé společně vydají na další dobrodružství. 
Aby vzpomínky na tento den zůstaly uchovány nejen v našich pamětích, bude po obřadu probíhat společné focení.

				</div>
			</MapDescription>

			<MapDescription v-slot="{expanded}" class="lg:mb-[200px] lg:ml-[-470px] xl:ml-[-650px]" > 
				<div  class="text-3xl xl:text-4xl">
					Cestou necestou
				</div> 
				<ul>
					<li  class="my-2 xl:text-xl"> <b>14:30 přejezd na hostinu</b></li>
				</ul>
				<div v-if="expanded">
					Ti zvás, kteří již ochutnali vzorky domácích pálenek a jiných alkoholických nápojů, nemáte nyní jinou možnost, než k přepravě využít připravený autobus. Ti zvás, kteří jste se s námi sešli až na Chlumě, do navigace si zadejte adresu: Jihlavská 76, Okříšky.
				</div>
			</MapDescription>

			<MapDescription v-slot="{expanded}" class="lg:mb-[-680px] lg:ml-[110px]"> 
				<div  class="text-3xl xl:text-4xl">
					Hostina a párty v Okříškách
				</div> 
				<ul>
					<li  class="my-2 xl:text-xl"> <b>15:00 hostina</b></li>
					<li v-if="expanded"  class="my-2 xl:text-xl"> <b>16:00 dort</b></li>
					<li v-if="expanded"  class="my-2 xl:text-xl"> <b>16:30 první tanec</b></li>
					<li v-if="expanded"  class="my-2 xl:text-xl"> <b>17:00 kytice</b></li>
					<li  class="my-2 xl:text-xl"> <b>18:30 raut</b></li>
				</ul>
				<div v-if="expanded">
					<p>
						Protože jak se tak říká, láska prochází žaludkem a před dobrou párty je potřeba mít kvalitní základ, nebude chybět vývar s knedličkama, svíčková ani kus svatebního dortu. Pokud to plné žaludky dovolí, bude následovat první tanec novomanželů.
					</p>  
					<p>
						O trochu vzrušení svobodných slečen se postará nejen Michal Monínec, ale i hod svatební kyticí. Po všech tanečních čislech bude třeba znovu doplnit energii, takže je připraven i raut plný dobrot. 
	
					</p> 
					<p>
						Pak už nebrání nic tomu, užít si společně večer plný zábavy.
					</p>


				</div>
			</MapDescription>


			<div class="flex justify-center mt-14 lg:mt-0">
				<img class="max-w-[500px] w-max hidden lg:block" src="./../assets/map/mapa.svg" />
				<img class="max-w-[300px] w-max lg:hidden" src="./../assets/map/mapa_mobil.svg" />
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
