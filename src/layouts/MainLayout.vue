<template>
	<div class="main-layout">
		<v-header />
		<div class="container">
			<router-view/>
		</div>
		<v-footer />
	</div>
</template>

<script>
import vHeader from '@/components/partials/vHeader.vue';
import vFooter from '@/components/partials/vFooter.vue';

export default {
	name: 'main-layout',
	components: {
		vFooter,
		vHeader
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.main-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: $background-color;
		background-color: red;
	}
</style>
