<template>
  <div id="app">
		<v-navigation />
    <router-view/>
  </div>
</template>

<script>
import VNavigation from '@/components/Blocks/VNavigation.vue';

export default {
	components: {
		VNavigation
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
