<template>
	<nav class="navigation">
		<ul class="navigation__list">
			<li class="navigation__item">
				<router-link class="navigation__link" to="/">Контакты</router-link>
			</li>
			<li class="navigation__item">
				<router-link class="navigation__link" to="/about">О компании</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'v-navigation'
}
</script>

<style lang="scss">
@import '@/style/variables.scss';

	.navigation {
		&__list {
			display: flex;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			border: 1px solid #ffffff;
			border-right: none;
			&:first-child {
				border-top-left-radius: 3px;
				border-bottom-left-radius: 3px;
			}
			&:last-child {
				border: 1px solid #ffffff;
				border-top-right-radius: 3px;
				border-bottom-right-radius: 3px;
			}
		}
		&__link {
			display: block;
			padding: 5px 12px;
			color: inherit;
			transition: color 0.2s ease-in, background-color 0.2s ease-in;
			&:hover,
			&:focus {
				color: $main-color;
				background-color: #ffffff;
				text-decoration: none;
			}
		}
		&__link.router-link-exact-active {
			color: $main-color;
			background-color: #ffffff;
		}
	}
</style>
