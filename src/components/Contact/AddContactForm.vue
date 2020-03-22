<template>
	<form action="" class="add-contact-form">

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Имя'" :focus="true" @on-change="updateFormValue($event, 'name')" />
			<v-input class="add-contact-form__field" :title="'Адрес'" @on-change="updateFormValue($event, 'location')" />
		</div>

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Телефон'" :type="'tel'" @on-change="updateFormValue($event, 'phone')" />
			<v-input class="add-contact-form__field" :title="'E-mail'" :type="'email'" @on-change="updateFormValue($event, 'email')" />
		</div>

		<div class="add-contact-form__group">
			<v-input class="add-contact-form__field" :title="'Возраст'" @on-change="updateFormValue($event, 'age')" />
			<v-input class="add-contact-form__field" :title="'Статус'" @on-change="updateFormValue($event, 'tags')" />
		</div>

		<div class="add-contact-form__group">
			<v-input-radio class="add-contact-form__field"
				:title="'Пол'"
				:name="'sex'"
				:value="['мужской', 'женский']"
				@on-change="updateFormValue($event, 'sex')"
			/>
		</div>

	</form>
</template>

<script>
import vInput from '@/components/blocks/vInput.vue';
import vInputRadio from '@/components/blocks/vInputRadio.vue';

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
				value = value.split(',').map((val) => {
					return val.trim();
				});
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
