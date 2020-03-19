<template>
	<form action="" class="user-settings">
		<label class="user-settings__label">
			<span class="user-settings__title">Изменить имя</span>
			<input class="user-settings__field input" type="text" v-model="user.name">
		</label>

			<label class="user-settings__label">
			<span class="user-settings__title">Изменить адрес электронной почты</span>
			<input class="user-settings__field input" type="email" v-model="user.email">
		</label>

		<label class="user-settings__label">
			<span class="user-settings__title">Изменить фотографию профиля</span>
			<input class="user-settings__field" type="file" accept="image/*"	 ref="file" @change="updateUserPhoto">
		</label>

		<button @click.prevent="emitUserProfile">Передать</button>
	</form>
</template>

<script>
export default {
	name: 'v-user-settings',
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
		updateUserPhoto() {
			const image = this.$refs.file.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = (event) => {
				this.user.photo =  event.target.result;
			}
		},
		emitUserProfile() {
			this.$emit('on-update', this.user);
		}
	},

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
		}
		&__field {
			width: 100%;
		}
	}
</style>
