<template>
	<div class="auth-overlay">
		<div class="auth">
			<div class="auth__logo">
				<v-logo :width="60" />
			</div>
			<span class="auth__title">{{ title }}</span>

			<form v-if="type === 'login'" class="auth__form" action="" @submit.prevent="login">
					<label class="auth__label auth__label--name">
						<input type="text" class="auth__field input" placeholder="Адрес электронной почты" v-model="user.email">
					</label>
					<label class="auth__label auth__label--password">
						<input type="password" class="auth__field input" placeholder="Пароль" autocomplete="on" v-model="user.password">
					</label>
					<button class="auth__button" :disabled="!disabled">Войти</button>

					<span class="auth__text">
						Еще нет аккаунта? <router-link class="auth__link" to="/register">Зарегистрируйтесь</router-link>
					</span>
			</form>


			<form v-if="type === 'register'" class="auth__form" action="" @submit.prevent="register">
				<label class="auth__label auth__label--name">
					<input type="text" class="auth__field input" placeholder="Имя пользователя" v-model="user.name">
				</label>
				<label class="auth__label auth__label--email">
					<input type="text" class="auth__field input" placeholder="Адрес электронной почты" v-model="user.email">
				</label>
				<label class="auth__label auth__label--password">
					<input type="password" class="auth__field input" placeholder="Пароль" autocomplete="on" v-model="user.password">
				</label>
				<label class="auth__label auth__label--password">
					<input type="password" class="auth__field input" placeholder="Повторите пароль" autocomplete="on" v-model="user.repeatPassword">
					<span v-if="user.password !== user.repeatPassword" class="auth__error">Пароли должны совпадать</span>
				</label>
				<button class="auth__button" :disabled="!disabled">Зарегистрироваться</button>

				<span class="auth__text">
					Уже есть аккаунт? <router-link class="auth__link" to="/login">Войти</router-link>
				</span>
			</form>

		</div>
	</div>
</template>

<script>
import vLogo from '@/components/Blocks/vLogo.vue';

export default {
	name: 'v-auth',
	components: {
		vLogo
	},
	props: {
		type: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			user: {
				name: '',
				email: '',
				password: '',
				repeatPassword: ''
			}
		}
	},
	methods: {
		login() {
			this.$store.dispatch('login', this.user);
		},
		register() {
			this.$store.dispatch('createUser', this.user);

		}
	},
	computed: {
		title() {
			return this.type === 'login' ? 'Авторизация' : 'Регистрация';
		},
		disabled() {
			if (this.type === 'login') {
				return this.user.email.length > 0 && this.user.password.length > 0;
			}
			if (this.type === 'register') {
				return this.user.email.length > 0 && this.user.password.length > 0 && this.user.password === this.user.repeatPassword;
			}
		}
	}
}
</script>

<style lang="scss">
@import "@/style/variables.scss";
@import "@/style/input.scss";

	.auth-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: $background-color;
	}

	.auth {
		position: relative;
		width: 300px;
		padding: 40px 20px 20px;
		background-color: #ffffff;
		box-shadow: 0 0 10px rgba($color: $main-color, $alpha: 0.3);
		border-radius: 3px;
		box-sizing: border-box;
		&__title {
			display: block;
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: bold;
			line-height: 1;
			text-align: center;
		}
		&__logo {
			position: absolute;
			top: 0;
			left: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 70px;
			height: 70px;
			background-color: $main-color;
			border-radius: 50%;
			transform: translate(-50%, -50%);
			box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.2);
		}
		&__group {
			margin: 0;
			padding: 0;
			border: none;
		}
		&__label {
			position: relative;
			display: block;
			margin-bottom: 10px;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				right: 10px;
				width: 15px;
				height: 15px;
				transform: translateY(-50%);
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
			}
		}
		&__label--name {
			&::before {
				background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='path-1-inside-1' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 5C6.38071 5 7.5 3.88071 7.5 2.5C7.5 1.11929 6.38071 0 5 0C3.61929 0 2.5 1.11929 2.5 2.5C2.5 3.88071 3.61929 5 5 5ZM5 5C4.34339 5 3.69321 5.12933 3.08658 5.3806C2.47995 5.63188 1.92876 6.00017 1.46447 6.46447C1.00017 6.92876 0.631876 7.47996 0.380602 8.08658C0.129329 8.69321 0 9.34339 0 10H5H10C10 9.34339 9.87067 8.69321 9.6194 8.08658C9.36812 7.47995 8.99983 6.92876 8.53553 6.46447C8.07124 6.00017 7.52004 5.63188 6.91342 5.3806C6.30679 5.12933 5.65661 5 5 5Z'/%3E%3C/mask%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 5C6.38071 5 7.5 3.88071 7.5 2.5C7.5 1.11929 6.38071 0 5 0C3.61929 0 2.5 1.11929 2.5 2.5C2.5 3.88071 3.61929 5 5 5ZM5 5C4.34339 5 3.69321 5.12933 3.08658 5.3806C2.47995 5.63188 1.92876 6.00017 1.46447 6.46447C1.00017 6.92876 0.631876 7.47996 0.380602 8.08658C0.129329 8.69321 0 9.34339 0 10H5H10C10 9.34339 9.87067 8.69321 9.6194 8.08658C9.36812 7.47995 8.99983 6.92876 8.53553 6.46447C8.07124 6.00017 7.52004 5.63188 6.91342 5.3806C6.30679 5.12933 5.65661 5 5 5Z' fill='%23606060'/%3E%3Cpath d='M1.46447 6.46447L0.757359 5.75736L0.757359 5.75736L1.46447 6.46447ZM0.380602 8.08658L-0.543277 7.7039L-0.543277 7.7039L0.380602 8.08658ZM0 10H-1V11H0V10ZM10 10V11H11V10H10ZM9.6194 8.08658L10.5433 7.7039L10.5433 7.7039L9.6194 8.08658ZM8.53553 6.46447L9.24264 5.75736L9.24264 5.75736L8.53553 6.46447ZM6.5 2.5C6.5 3.32843 5.82843 4 5 4V6C6.933 6 8.5 4.433 8.5 2.5H6.5ZM5 1C5.82843 1 6.5 1.67157 6.5 2.5H8.5C8.5 0.567003 6.933 -1 5 -1V1ZM3.5 2.5C3.5 1.67157 4.17157 1 5 1V-1C3.067 -1 1.5 0.567003 1.5 2.5H3.5ZM5 4C4.17157 4 3.5 3.32843 3.5 2.5H1.5C1.5 4.433 3.067 6 5 6V4ZM5 4C4.21207 4 3.43185 4.15519 2.7039 4.45672L3.46927 6.30448C3.95457 6.10346 4.47471 6 5 6V4ZM2.7039 4.45672C1.97595 4.75825 1.31451 5.20021 0.757359 5.75736L2.17157 7.17157C2.54301 6.80014 2.98396 6.5055 3.46927 6.30448L2.7039 4.45672ZM0.757359 5.75736C0.200207 6.31451 -0.241749 6.97595 -0.543277 7.7039L1.30448 8.46927C1.5055 7.98396 1.80014 7.54301 2.17157 7.17157L0.757359 5.75736ZM-0.543277 7.7039C-0.844806 8.43185 -1 9.21207 -1 10H1C1 9.47471 1.10346 8.95457 1.30448 8.46927L-0.543277 7.7039ZM0 11H5V9H0V11ZM5 11H10V9H5V11ZM11 10C11 9.21207 10.8448 8.43185 10.5433 7.7039L8.69552 8.46927C8.89654 8.95457 9 9.47471 9 10H11ZM10.5433 7.7039C10.2417 6.97595 9.79979 6.31451 9.24264 5.75736L7.82843 7.17157C8.19986 7.54301 8.4945 7.98396 8.69552 8.46927L10.5433 7.7039ZM9.24264 5.75736C8.68549 5.20021 8.02405 4.75825 7.2961 4.45672L6.53073 6.30448C7.01604 6.5055 7.45699 6.80014 7.82843 7.17157L9.24264 5.75736ZM7.2961 4.45672C6.56815 4.15519 5.78793 4 5 4V6C5.52529 6 6.04543 6.10346 6.53073 6.30448L7.2961 4.45672Z' fill='%23606060' mask='url(%23path-1-inside-1)'/%3E%3C/svg%3E%0A");
			}

		}
		&__label--password {
			&::before {
				background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3.5' cy='3.5' r='2.5' stroke='%23606060' stroke-width='2'/%3E%3Cpath d='M6 3H12' stroke='%23606060' stroke-width='2'/%3E%3Cpath d='M9 5.25V3H10.4667V5.25H9Z' fill='%23606060' stroke='%23606060'/%3E%3C/svg%3E%0A");
			}
		}
		&__field {
			padding: 7px 30px 7px 10px;
			font-size: 14px;
			&::placeholder {
				font-size: 14px;
				color: $text-color-light;
			}
		}
		&__button {
			padding: 7px 14px;
			width: 100%;
			margin-bottom: 20px;
			color: $main-color;
			font-size: 14px;
			font-weight: bold;
			background-color: #ffffff;
			border: 2px solid $main-color;
			border-radius: 3px;
			cursor: pointer;
			transition: color 0.2s ease-in, background-color 0.2s ease-in;
			&:hover,
			&:focus {
				color: #ffffff;
				background-color: $main-color;
			}
			&:hover:disabled,
			&:focus:disabled {
				color: $border-color;
				background-color: #ffffff;
			}
			&:disabled {
				color: $border-color;
				border-color: $border-color;
				cursor: default;
			}
		}
		&__text {
			display: block;
			font-size: 14px;
		}
		&__error {
			position: absolute;
			display: block;
			padding: 3px 5px;
			top: 50%;
			right: 0;
			color: #ffffff;
			font-size: 12px;
			text-align: center;
			background-color: $danger-color;
			border-radius: 10px;
			transform: translate(105%, -50%);
			box-sizing: border-box;
			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: -5px;
				width: 0;
				height: 0;
				border-top: 5px solid transparent;
				border-bottom: 5px solid transparent;
				border-right: 7px solid $danger-color;
				transform: translateY(-50%);
			}
		}
	}
</style>
