<template>
	<main class="main-layout">
		<v-navigation />
		<router-view/>
		<v-footer />
	</main>
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
		flex-grow: 1;
		background-color: $background-color;
	}
</style>
