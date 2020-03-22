<template>
	<form action="" class="user-settings">
		<label class="user-settings__label">
			<span class="user-settings__title">Имя</span>
			<input class="user-settings__field input" type="text" v-model.lazy="user.name">
		</label>

			<label class="user-settings__label">
			<span class="user-settings__title">Адрес электронной почты</span>
			<input class="user-settings__field input" type="email" v-model.lazy="user.email">
		</label>

		<label class="user-settings__label">
			<span class="user-settings__title">Фотография профиля</span>
			<v-input-file :title="'Выберите изображение'" :accept="'image/*'" @on-select="updateUserPhoto" />
		</label>
	</form>
</template>

<script>
import vInputFile from '@/components/blocks/vInputFile.vue';

export default {
	name: 'v-user-settings',
	components: {
		vInputFile
	},
	data() {
		return {
			user: {
				name: '',
				email: '',
				photo: ''
			}
		}
	},
	methods: {
		updateUserPhoto(image) {
			this.user.photo = image;
		},
		setUserProfile() {
			this.$emit('on-update', this.user);
		}
	},
	watch: {
		user: {
			handler(val) {
				this.setUserProfile();
			},
			deep: true
		}
	}

}
</script>

<style lang="scss">
	.user-settings {
		padding: 10px;
		&__label {
			display: block;
			margin-bottom: 10px;
		}
		&__title {
			display: block;
			font-size: 14px;
			margin-bottom: 3px;
		}
		&__field {
			width: 100%;
		}
	}
</style>
