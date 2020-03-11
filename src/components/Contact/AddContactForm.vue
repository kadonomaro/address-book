<template>
	<form action="" class="add-contact-form">

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Имя'" :focus="true" @on-input="updateFormValue($event, 'name')" />
			<v-input class="add-contact-form__field" :title="'Адрес'" @on-input="updateFormValue($event, 'location')" />
		</div>

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Телефон'" :type="'tel'" @on-input="updateFormValue($event, 'phone')" />
			<v-input class="add-contact-form__field" :title="'E-mail'" :type="'email'" @on-input="updateFormValue($event, 'email')" />
		</div>

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Возраст'" @on-input="updateFormValue($event, 'age')" />
			<v-input class="add-contact-form__field" :title="'Статус'" @on-input="updateFormValue($event, 'tags')" />
		</div>

		<div class="add-contact-form__group">
			<v-input-radio class="add-contact-form__field"
				:title="'Пол'"
				:name="'sex'"
				:value="['мужской', 'женский']"
				@on-input="updateFormValue($event, 'sex')"
			/>
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
	},
	data() {
		return {
			form: {
				name: '',
				age: '',
				sex: '',
				location: '',
				phone: '',
				email: '',
				tags: ''

			}
		}
	},
	methods: {
		updateFormValue(value, input) {
			if (input === 'tags') {
				value = value.replace(/\s/g, '').split(',');
			}
			this.form[input] = value;
			this.$emit('update-info', this.form);
		}
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
