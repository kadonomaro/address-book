<template>
	<nav class="navigation">
		<ul class="navigation__list">
			<li class="navigation__item">
				<router-link class="navigation__link" to="/">Home</router-link>
			</li>
			<li class="navigation__item">
				<router-link class="navigation__link" to="/about">About</router-link>
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
		position: relative;
		padding: 20px 30px;
		color: #ffffff;
		background-color: $main-color;
		box-shadow: 0 3px 5px rgba($color: #000000, $alpha: 0.3);
		&__list {
			display: flex;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			&:first-child {
				border-top-left-radius: 3px;
				border-bottom-left-radius: 3px;
			}
			&:last-child {
				border-top-right-radius: 3px;
				border-bottom-right-radius: 3px;
			}
		}
		&__link {
			display: block;
			padding: 5px 12px;
			color: inherit;
			border: 1px solid #ffffff;
			border-radius: inherit;
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
