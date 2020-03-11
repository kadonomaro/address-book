<template>
	<footer class="footer">
		<div class="footer__inner">
			<v-logo :theme="'light'" />
		</div>
	</footer>
</template>

<script>
import vLogo from '@/components/Blocks/vLogo.vue';

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
		padding: 20px 30px;
		background-color: $main-color;
		&__inner {
			display: flex;
		}
	}
</style>
