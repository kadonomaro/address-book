<template>
	<header class="header">
		<div class="header__inner">
			<v-navigation class="header__navigation" />
			<v-user />
		</div>
	</header>
</template>

<script>
import vNavigation from '@/components/Blocks/vNavigation.vue';
import vUser from '@/components/Blocks/vUser.vue';

export default {
	name: 'v-header',
	components: {
		vNavigation,
		vUser
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.header {
		&__inner {
			position: relative;
			display: flex;
			align-items: center;
			padding: 20px 30px;
			color: #ffffff;
			background-color: $main-color;
			box-shadow: 0 4px 5px rgba($color: #a1afbf, $alpha: 0.7);
		}
		&__navigation {
			margin-right: auto;
		}
	}
</style>
