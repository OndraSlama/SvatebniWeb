<template>
<v-app class="tw-bg-[url('/images/bg.jpg')] tw-bg-opacity-10">
	<v-main>
		<HeaderSection></HeaderSection>
		<v-container>
			<ConfirmationForm></ConfirmationForm>			
		</v-container>		
	</v-main>
</v-app>

</template>

<script setup>
import ConfirmationForm from './../components/ConfirmationForm.vue'
import HeaderSection from './../components/HeaderSection.vue'
	
</script>