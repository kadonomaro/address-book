<template>
	<form action="" class="add-contact-form">

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Имя'" />
			<v-input class="add-contact-form__field" :title="'Адрес'" />
		</div>

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Телефон'" :type="'tel'" />
			<v-input class="add-contact-form__field" :title="'E-mail'" :type="'email'" />
		</div>

		<div class="add-contact-form__group">
			<v-input-radio class="add-contact-form__field"
				:title="'Пол'"
				:name="'sex'"
				:value="['мужской', 'женский']"
			/>
			<v-input class="add-contact-form__field" :title="'Адрес'" />
		</div>

	</form>
</template>

<script>
import vInput from '@/components/Blocks/vInput.vue';
import vInputRadio from '@/components/Blocks/vInputRadio.vue';

export default {
	name: 'add-contact-form',
	components: {
		vInput,
		vInputRadio
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.add-contact-form {
		&__group {
			display: flex;
			border: none;
		}
		&__field {
			width: 50%;
		}
	}


</style>
