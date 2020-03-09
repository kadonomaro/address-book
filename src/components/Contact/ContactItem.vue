<template>
	<div class="contact-item">
		{{ contact }}
	</div>
</template>

<script>
import { db } from '@/main';

export default {
	name: 'contact-item',
	data() {
		return {
			id: this.$route.params.id,
			contact: null
		}
	},
	mounted() {
		this.getContactById(this.id);
	},
	methods: {
		async getContactById(id) {
			await db.ref('contacts/' + id)
				.once('value')
				.then((snapshot) => {
					this.contact = snapshot.val();
				})
		}
	}
}
</script>

<style lang="scss">

</style>
