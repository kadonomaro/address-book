<template>
	<div class="login-overlay">
		<div class="login">
			<div class="login__logo">
				<v-logo :width="60" />
			</div>
			<span class="login__title">Авторизация</span>
			<form class="login__form" action="">

				<label for="" class="login__label">
					<input type="text" class="login__field input" placeholder="Имя пользователя">
				</label>
				<label for="" class="login__label">
					<input type="password" class="login__field input" placeholder="Пароль">
				</label>

				<button class="login__button">Войти</button>

			</form>
		</div>
	</div>
</template>

<script>
import vLogo from '@/components/Blocks/vLogo.vue';

export default {
	name: 'v-login',
	components: {
		vLogo
	}
}
</script>

<style lang="scss">
@import "@/style/variables.scss";
@import "@/style/input.scss";

	.login-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background-color: $background-color;
	}

	.login {
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
		&__label {
			display: block;
			margin-bottom: 10px;
		}
		&__field {
			font-size: 14px;
			&::placeholder {
				font-size: 14px;
			}
		}
		&__button {
			padding: 7px 14px;
			width: 100%;
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
		}
	}
</style>
