<template>
	<v-form @submit.prevent="sendForm" class="">
		<v-sheet class="d-flex flex-wrap border ">
			<div class="border" >Tímto potvrzuji, že přijdu já </div>
			<v-text-field v-model="data.name" variant="outlined" label="Jméno a příjmení" class=""/>
			<div class="border"> s </div>
			<v-text-field v-model="data.totalNumber" variant="outlined" type="number" label="počet" class="" />
			<span> {{ isAlone ? "žádnou" : "" }} další{{ isPlural ? "mi" : "" }} </span>
			<span> {{ isPlural ? "lidmi" : "osobou" }}.</span>	
			<span v-if="!isAlone"> Z toho </span>
			<input v-if="!isAlone" v-model="data.childNumber" type="number" placeholder="počet" class="" />
			<span  v-if="!isAlone"> {{ !data.childNumber ? "žádné ne" : "" }}bud{{ data.childNumber > 1 ? "ou děti" : "e dítě" }}. </span>
			<span class=""></span>
			<span> Přijed{{ isAlone ? "u" : "eme" }} </span>
			<select v-model="data.arrival" class="">
				<option value="sraz">na sraz do Horního Smrčného</option>
				<option value="obrad">až na obřad na Chlumě</option>
			</select>
			<span v-if="data.arrival != 'sraz'">.</span> 
			<span v-if="data.arrival == 'sraz'"> odkud </span>
			<select v-if="data.arrival == 'sraz'" v-model="data.transportSraz" class="">
				<option value="alone">se dopravím{{ isAlone ? " sám" : "e sami" }}</option>
				<option value="arrange">využij{{ isAlone ? "i" : "eme" }} odvoz</option>
			</select>
			<span v-if="data.arrival == 'sraz'"> na obřad na Chlum. </span>
			<span class=""></span>
			<span> Z Chlumu </span>

			<select v-model="data.transportObrad" class="">
				<option value="alone">se dopravím{{ isAlone ? " sám" : "e sami" }}</option>
				<option value="arrange">využij{{ isAlone ? "i" : "eme" }} odvoz</option>
			</select>

			<span> na hostinu v Okřížkách. </span>
			<span class=""></span>
			<span> Přespání </span>
			<select v-model="data.sleeping" class="">
				<option value="alone"> zařídit nepotřebuj{{isAlone ? "i":"eme"}}</option>
				<option value="arrange">{{isAlone ? "bych potřeboval":"bychom potřebovali"}} zařídit</option>
			</select>
			<span v-if="data.sleeping == 'arrange'"> . </span>
			<span v-if="data.sleeping == 'arrange'">  Proto přidávám kontakt: </span>
			<input  v-if="data.sleeping == 'arrange'" v-model="data.contact" type="text" placeholder="tel. číslo nebo email" class="" />
			<span> . </span>
			<br>
			<span class="">Vzkaz pro snoubence: </span>
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
