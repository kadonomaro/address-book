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
	.main-layout {
		flex-grow: 1;
	}

</style>
