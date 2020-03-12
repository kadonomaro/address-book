<template>
	<div class="main-layout">
		<v-navigation />
		<router-view/>
		<v-footer />
	</div>
</template>

<script>
import vNavigation from '@/components/Blocks/vNavigation.vue';
import vFooter from '@/components/Blocks/vFooter.vue';

export default {
	name: 'main-layout',
	components: {
		vNavigation,
		vFooter
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.main-layout {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: $background-color;
	}
</style>
