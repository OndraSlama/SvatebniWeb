<template>
	<v-form @submit.prevent="sendForm" class="">
		<v-sheet class="tw-flex tw-flex-wrap tw-items-center" id="formSheet">
			<div class=" tw-border-2" >Tímto potvrzuji, že přijdu </div>
			<v-text-field v-model="data.name" label="já" placeholder="Jméno a příjmení" class="tw-min-w-[150px]"/>
			<div class="border"> s </div>
			<v-text-field v-model="data.totalNumber" type="number" label="počet" class="tw-min-w-[50px]"/>
			<div> {{ isAlone ? "žádnou" : "" }} další{{ isPlural ? "mi" : "" }} </div>
			<div> {{ isPlural ? "lidmi" : "osobou" }}.</div>	
			<div v-if="!isAlone"> Z toho </div>
			<v-text-field v-if="!isAlone" v-model="data.childNumber" type="number" label="počet" class="tw-min-w-[50px]" />
			<div  v-if="!isAlone"> {{ !data.childNumber ? "žádné ne" : "" }}bud{{ data.childNumber > 1 ? "ou děti" : "e dítě" }}. </div>
			<div class=""></div>
			<v-select v-model="data.arrival" class="" :label="isAlone ? 'Přijedu' : 'Přijedeme'" item-text="text" item-value="value" :items="[
				'na sraz do Horního Smrčného',
				'až na obřad na Chlumě'
			]">
			</v-select>
			<div v-if="data.arrival != 'sraz'">.</div> 
			<div v-if="data.arrival == 'sraz'"> odkud </div>
			<select v-if="data.arrival == 'sraz'" v-model="data.transportSraz" class="">
				<option value="alone">se dopravím{{ isAlone ? " sám" : "e sami" }}</option>
				<option value="arrange">využij{{ isAlone ? "i" : "eme" }} odvoz</option>
			</select>
			<div v-if="data.arrival == 'sraz'"> na obřad na Chlum. </div>
			<div class=""></div>
			<div> Z Chlumu </div>

			<select v-model="data.transportObrad" class="">
				<option value="alone">se dopravím{{ isAlone ? " sám" : "e sami" }}</option>
				<option value="arrange">využij{{ isAlone ? "i" : "eme" }} odvoz</option>
			</select>

			<div> na hostinu v Okřížkách. </div>
			<div class=""></div>
			<div> Přespání </div>
			<select v-model="data.sleeping" class="">
				<option value="alone"> zařídit nepotřebuj{{isAlone ? "i":"eme"}}</option>
				<option value="arrange">{{isAlone ? "bych potřeboval":"bychom potřebovali"}} zařídit</option>
			</select>
			<div v-if="data.sleeping == 'arrange'"> . </div>
			<div v-if="data.sleeping == 'arrange'">  Proto přidávám kontakt: </div>
			<input  v-if="data.sleeping == 'arrange'" v-model="data.contact" type="text" placeholder="tel. číslo nebo email" class="" />
			<div> . </div>
			<br>
			<div class="">Vzkaz pro snoubence: </div>
			<textarea v-model="data.message"  placeholder="Např: Chci tatarák. Pivo jedině Bernard." class="" />
		</v-sheet>
		<input :disabled="sendingForm || !formIsValid" type="submit" value="Odeslat" class="" />
		<p v-if="!formIsValid && !formSent" class="">Vyplň všechna povinná pole.</p>
	</v-form>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const data = ref();
function initializeForm() {
	data.value = {
		name: "",
		totalNumber: null,
		childNumber: null,
		arrival: null,
		transportSraz: null,
		transportObrad: null,
		sleeping: null,
		contact: "",
		message: "",
		
	};
}
initializeForm();

let isPlural = computed(() => data.value.totalNumber > 1)
let isAlone = computed(() => !data.value.totalNumber)

// Watch child number
watch(() => data.value.childNumber, (newValue, oldValue) => {
	if (newValue > data.value.totalNumber) {
		data.value.childNumber = oldValue;
	}
});

// Watch total number
watch(() => data.value.totalNumber, newValue => {
	if (newValue == "") return
	if (newValue < data.value.childNumber) {
		data.value.childNumber = newValue;
	}
});

const formSent = ref(false);
const sendingForm = ref(false);


const formIsValid = computed(() => {
	if (!(data.value.name 
		&& data.value.arrival 
		&& data.value.transportObrad
		&& data.value.sleeping)){
		return false;
	}

	if (data.value.arrival == 'sraz'){
		if (!data.value.transportSraz){
			return false;
		}
	}

	if (data.value.sleeping == 'arrange'){
		if (!data.value.contact){
			return false;
		}
	}

	return true;
});

function sendForm() {
	sendingForm.value = true;

	if (!formIsValid.value){
		alert("Vyplň prosím všechna povinná pole.");
		sendingForm.value = false;
		return;
	}

	var requestOptions = {
		method: 'POST',
		body: JSON.stringify(data.value),
	};
	fetch("https://script.google.com/macros/s/AKfycbxENhogo4bjFgBq7tu0u2q5_EZg3wotw7orbsNKNe1SeclhWWRVfmZjlvwhzmnE51Y/exec", requestOptions)
		.then(response => response.text())
		.then(result => {
			console.log(result);	
			if(result == "Error"){
				alert("Omlouváme se, ale něco se pokazilo. Potvrzení účasti se nedalo zpracovat. Zkontroluj data a zkus to prosím znovu.");
			}else{
				alert("Děkuji za odeslání formuláře. Potvrzení účasti úspěšně odesláno.");
				formSent.value = true;
				initializeForm()
			}
		})
		.catch(error => {
			console.log(error);
			alert("Omlouváme se, ale něco se pokazilo. Potvrzení účasti nebylo přijato. Zkus to prosím znovu.");
		})
		.finally(() => {
			sendingForm.value = false;
		});
}

function onlyNumber($event) {
   let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
   if ((keyCode < 49 || keyCode > 57)) { // 46 is dot
      $event.preventDefault();
   }
}

</script>

<style>

#formSheet div {
	@apply tw-max-h-14 tw-mr-2 tw-mb-2
}

/* .form-inner-line {
	@apply flex place-items-center gap-2;
}
.form-line {
	@apply flex place-items-center gap-2 py-2 flex-wrap;
}

. {
	@apply border-2 border-amber-700 border-opacity-40 rounded-md focus:border-red-700 px-2;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
} */


</style>
