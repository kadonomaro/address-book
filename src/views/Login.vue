<template>
	<div class="login-page">
		<v-auth :type="'login'" />
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
