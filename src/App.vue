<template>
  <div id="app">
		<v-navigation />
    <router-view/>
  </div>
</template>

<script>
import vNavigation from '@/components/Blocks/vNavigation.vue';

export default {
	components: {
		vNavigation
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
