<template>
	<form action="" class="add-contact-form">

		<div class="add-contact-form__group">
			<v-input :title="'Имя'" />
			<v-input :title="'Адрес'" />
		</div>

		<div class="add-contact-form__group">
			<v-input :title="'Телефон'" :type="'tel'" />
			<v-input :title="'E-mail'" :type="'email'" />
		</div>

	</form>
</template>

<script>
import vInput from '@/components/Blocks/vInput.vue';

export default {
	name: 'add-contact-form',
	components: {
		vInput
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
	}


</style>
