<template>
		
		<Title>Svatebni den</Title>
		<!-- <div class="tw-text-center tw-text-2xl tw-mt-[-50px]"> Najetím na sekce zobrazíš další info.</div> -->
		<div class="tw-flex tw-flex-col lg:tw-flex-row tw-gap-3 tw-relative tw-justify-center tw-items-center tw-pb-16 lg:tw-pt-10 tw-px-4">
			<MapDescription v-slot="{expanded}" class="lg:tw-mb-[780px] lg:tw-ml-[-500px] xl:tw-ml-[-680px]"> 

				<div class="tw-text-3xl xl:tw-text-4xl">Sraz v Horním smrčném</div>
				<ul>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>10:00 sraz u nevěsty</b></li>
					<li  v-if="expanded"> <b>Zdobení aut, Vývazkování svatebčanů, Něco malého k zakousnutí</b> </li>
				</ul>

				<div v-if="expanded">Obec Horní Smrčné je jedna z nejmenších vesniček na Vysočině. Co ji chybí do velikosti, rozhodně ji nechybí do krásy. Navzdory tomu, že něvěsta pochází z Přibyslavic, okouzlena malebností této vesničky již od dob, kdy zde u prarodičů trávila prázdniny, rozhodala se vydat na další životní etapu právě odsud.</div>
				
			</MapDescription>

			<MapDescription v-slot="{expanded}"  class="lg:tw-mb-[820px] xl:tw-top-[20py] lg:tw-ml-[300px]"> 
				<div  class="tw-text-3xl xl:tw-text-4xl">
					Autobusem na obřad
				</div> 
				<ul>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>11:30 společný přejezd na Chlum</b></li>
				</ul>
				<div v-if="expanded">
					Ti, kteří nedisponují vlastními auty nebo si rádi přihnou již před polednem, je vypraven na přejezd na obřad autobus
				</div>
			</MapDescription>

			<MapDescription v-slot="{expanded}" class="lg:tw-mb-[150px] lg:tw-ml-[250px]"> 
				<div  class="tw-text-3xl xl:tw-text-4xl">
					Obřad na Chlumě
				</div> 
				<ul>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>12:00 obřad</b></li>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>13:30 focení</b></li>
				</ul>
				<div  v-if="expanded">
					Přesně v poledne se se slibem, výměnou prstýků a stvrzením podpisem (snad postačí inkoust), se novomanželé společně vydají na další dobrodružství. 
Aby vzpomínky na tento den zůstaly uchovány nejen v našich pamětích, bude po obřadu probíhat společné focení.

				</div>
			</MapDescription>

			<MapDescription v-slot="{expanded}" class="lg:tw-mb-[200px] lg:tw-ml-[-470px] xl:tw-ml-[-650px]" > 
				<div  class="tw-text-3xl xl:tw-text-4xl">
					Cestou necestou
				</div> 
				<ul>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>14:30 přejezd na hostinu</b></li>
				</ul>
				<div v-if="expanded">
					Ti zvás, kteří již ochutnali vzorky domácích pálenk a jiných alkoholických nápojů, nemáte nyní jinou možnost, než k přepravě využít připravený autobus. Ti zvás, kteří jste se s námi sešli až na Chlumě, do navigace si zadejte adresu: Jihlavská 76, Okříšky.
				</div>
			</MapDescription>

			<MapDescription v-slot="{expanded}" class="lg:tw-mb-[-680px] lg:tw-ml-[110px]"> 
				<div  class="tw-text-3xl xl:tw-text-4xl">
					Hostina a párty v Okříškách
				</div> 
				<ul>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>15:00 hostina</b></li>
					<li v-if="expanded"  class="tw-my-2 xl:tw-text-xl"> <b>16:00 dort</b></li>
					<li v-if="expanded"  class="tw-my-2 xl:tw-text-xl"> <b>16:30 první tanec</b></li>
					<li v-if="expanded"  class="tw-my-2 xl:tw-text-xl"> <b>17:00 kytice</b></li>
					<li  class="tw-my-2 xl:tw-text-xl"> <b>18:30 raut</b></li>
				</ul>
				<div v-if="expanded">
					<p>
						Protože jak se tak říká, láska prochází žaludkem a před dobrou párty je potřeba mít kvalitní základ, nebude chybět vývar s knedličkama, svíčková ani kus svatebního dortu. Pokud to plné žaludky dovolí, bude následovat první tanec novomanželů.
					</p>  
					<p>
						O trochu vzrušení svobodných slečen se postará nejen Michal Monínec, ale i hod svatební kyticí. Po všech tanečních čísel bude třeba znovu doplnit energii, takže je připraven i raut plný dobrot. 
	
					</p> 
					<p>
						Pak už nebrání nic tomu, užít si společně večer plný zábavy.
					</p>


				</div>
			</MapDescription>


			<div class="tw-flex tw-justify-center tw-mt-14 lg:tw-mt-0">
				<img class="max-w-[300px] tw-hidden lg:tw-block" src="./../assets/map/mapa.svg" />
				<img class="max-w-[300px] lg:tw-hidden" src="./../assets/map/mapa_mobil.svg" />
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
