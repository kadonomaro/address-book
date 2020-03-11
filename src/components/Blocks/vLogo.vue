<template>
	<div :class="['logo', {'logo--light': theme === 'light'}]">
		<div class="logo__image"></div>
		<span class="logo__text">Лучшие решения для бизнеса</span>
	</div>
</template>

<script>
export default {
	name: 'v-logo',
	props: {
		theme: {
			type: String,
			required: false
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.logo {
		display: flex;
		align-items: center;
		max-width: 200px;
		padding: 5px;
		border: 1px solid $text-color;
		border-radius: 3px;
		&__image {
			width: 50px;
			height: 50px;
			flex-shrink: 0;
			margin-right: 10px;
			background-image: url('https://via.placeholder.com/50');
			border-radius: 50%;
		}
		&__text {
			display: block;
			color: $text-color;
		}
	}
	.logo--light {
		border-color: #ffffff;
		.logo__text {
			color: #ffffff;
		}
	}

</style>
