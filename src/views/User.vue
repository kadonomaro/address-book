<template>
	<div class="user-section">
		<v-user-detail :id="userId" />
	</div>
</template>

<script>
import vUserDetail from '@/components/User/vUserDetail.vue';

export default {
	name: 'User',
	components: {
		vUserDetail
	},
	computed: {
		userId() {
			return this.$route.query.id;
		}
	}
}
</script>
