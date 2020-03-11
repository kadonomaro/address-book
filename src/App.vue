<template>
  <div id="app">
		<v-navigation />
		<main-layout />
		<v-footer />
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import vNavigation from '@/components/Blocks/vNavigation.vue';
import vFooter from '@/components/Blocks/vFooter.vue';

export default {
	components: {
		vNavigation,
		vFooter,
		MainLayout
	}
}
</script>

<style lang="scss">
#app {
	display: flex;
	flex-direction: column;
	height: 100%;
  color: #303030;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
