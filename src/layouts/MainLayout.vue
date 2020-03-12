<template>
	<main class="main-layout">
		<router-view/>
	</main>
</template>

<script>
export default {
	name: 'main-layout'
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.main-layout {
		flex-grow: 1;
		background-color: $background-color;
	}
</style>
