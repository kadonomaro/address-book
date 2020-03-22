<template>
	<footer class="footer">
		<div class="footer__inner">
			<v-logo class="footer__logo" :theme="'light'" :text="'Лучшие решения для бизнеса'" />
			<ul class="footer__list">
				<li class="footer__item">
					<router-link class="footer__link" to="/">Главная</router-link>
				</li>
				<li class="footer__item">
					<router-link class="footer__link" to="/about">О нас</router-link>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script>
import vLogo from '@/components/partials/vLogo.vue';

export default {
	name: 'v-footer',
	components: {
		vLogo
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.footer {
		background-color: $main-color;
		&__inner {
			display: flex;
			align-items: center;
			padding: 20px 30px;
		}
		&__logo {
			margin-right: auto;
		}
		&__list {
			display: flex;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			padding: 0 10px;
		}
		&__link {
			color: #ffffff;
		}
	}


	@media ($size-mobile) {
		.footer {
			&__inner {
				padding: 10px;
			}
			&__logo {
				margin-right: 0;
			}
			&__list {
				display: block;
			}
			&__item {
				&:not(:last-child) {
					margin-bottom: 5px;
				}
			}
		}
	}
</style>
