<template>
	<div class="register-page">
		<v-auth :type="'register'" />
	</div>
</template>

<script>
import vAuth from '@/components/Auth/vAuth.vue';

export default {
	name: 'Login',
	components: {
		vAuth
	}
}
</script>

<style>

</style>
