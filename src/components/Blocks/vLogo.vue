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
		max-width: 240px;
		&__image {
			width: 120px;
			flex-shrink: 0;
			background-image: url('~@/assets/logo.svg');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center;
			&::before {
				content: '';
				display: block;
				padding-bottom: 65%;
			}
		}
		&__text {
			display: block;
			color: $text-color;
			font-size: 14px;
		}
	}
	.logo--light {
		border-color: #ffffff;
		.logo__text {
			color: #ffffff;
		}
	}

</style>
