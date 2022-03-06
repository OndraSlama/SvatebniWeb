<template>
	<form id="app" @submit.prevent="sendForm">
		<div class="form-line">
			<span :key="1">Přijdu já</span>
			<input :key="2" v-model="data.name" type="text" placeholder="Jméno a příjmení" class="form-input" />
			<span :key="3"> s {{ data.isAlone ? "žádnou" : "" }} další{{ data.isPlural ? "mi" : "" }} </span>
			<input :key="4" v-model="data.totalNumber" type="number" class="form-input w-12" />
			<span :key="5"> {{ data.isPlural ? "lidmi" : "osobou" }}.</span>	
				<span v-if="!data.isAlone" class="form-inner-line">
				<span> Z toho </span>
				<input v-model="data.childNumber" type="number" class="form-input w-12" />
				<span> {{ !data.childNumber ? "žádné ne" : "" }}bud{{ data.childNumber > 1 ? "ou děti" : "e dítě" }}. </span>
			</span>
			<span :key="6"> Přijed{{ data.isAlone ? "u" : "eme" }} </span>
			<select :key="7" v-model="data.arrival" class="form-input">
				<option value="sraz">na sraz do Horního Smrčného</option>
				<option value="obrad">až na obřad na Chlumě</option>
			</select>
			<span :key="8">.</span>
			<span :key="9" :class="data.arrival == 'obrad' ? 'hidden' : 'form-inner-line'">
				<span> odkud </span>
				<select v-model="data.transportSraz" class="form-input">
					<option value="alone">se dopravím{{ data.isAlone ? " sám" : "e sami" }}</option>
					<option value="lift">využij{{ data.isAlone ? "i" : "eme" }} odvoz</option>
				</select>
				<span> na obřad na Chlum. </span>
			</span>
			<span :key="10"> Z Chlumu </span>

			<select :key="11" v-model="data.transportObrad" class="form-input">
				<option value="alone">se dopravím{{ data.isAlone ? " sám" : "e sami" }}</option>
				<option value="lift">využij{{ data.isAlone ? "i" : "eme" }} odvoz</option>
			</select>

			<span :key="12"> na hostinu v Okřížkách. </span>
			<span :key="13"> Přespání </span>
			<select :key="14" v-model="data.sleeping" class="form-input">
				<option value="alone">si zařídím{{data.isAlone ? " sám":"e sami"}}</option>
				<option value="arrange">{{data.isAlone ? "bych potřeboval":"bychom potřebovali"}} zařídit</option>
			</select>
			<span :key="15"> . </span>
		</div>


		<input type="submit" value="Odeslat" class="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-md" />
	</form>
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
		text: "",
		isPlural: computed(() => data.value.totalNumber > 1),
		isAlone: computed(() => !data.value.totalNumber),
	};
}
initializeForm();

function sendForm() {
	console.log("sendForm");
	console.log(data.value);
	initializeForm();
}
</script>

<style>
.form-inner-line {
	@apply flex place-items-center gap-2;
}
.form-line {
	@apply flex place-items-center gap-2 py-2 border-2  flex-wrap;
}

.form-input {
	@apply border-2 border-amber-700 border-opacity-40 rounded-md focus:border-red-700 px-2;
}

/* .v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from{
  opacity: 0;
} */

/* .list-move {
  transition: transform 1s;
}
.list-item {
  margin-right: 10px;
}
.list-item:hover {
  background-color: wheat;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter, .list-leave-to  {
  opacity: 0;
} */


</style>
