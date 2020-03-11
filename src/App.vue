<template>
  <div id="app">
		<v-navigation />
    <router-view/>
		<v-footer />
  </div>
</template>

<script>
import vNavigation from '@/components/Blocks/vNavigation.vue';
import vFooter from '@/components/Blocks/vFooter.vue';

export default {
	components: {
		vNavigation,
		vFooter
	}
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303030;
}

</style>
