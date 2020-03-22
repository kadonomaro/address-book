<template>
  <div id="app">
		<component :is="layout">
			<router-view/>
		</component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

export default {
	components: {
		MainLayout,
		AuthLayout
	},
	created() {
		this.getUserInfoFromLocalStorage();
	},
	methods: {
		getUserInfoFromLocalStorage() {
			const userInfo = JSON.parse(localStorage.getItem('user_info'));
			this.$store.commit('SET_USER_INFO', userInfo);
		}
	},
	computed: {
		layout() {
			return (this.$route.meta.layout || 'main') + '-layout';
		}
	}
}
</script>

<style lang="scss">
	#app {
		color: #303030;
		font-family: Roboto, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
