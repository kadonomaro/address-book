<template>
	<div class="contact-list">
		<div v-for="contact in contacts" :key="contact.id">
			<div>{{ contact.name }}</div>
			<div>{{ contact.phone }}</div>
			<div>{{ contact.email }}</div>
			<hr>
		</div>
	</div>
</template>

<script>
import contacts from '@/test/contacts.json';

export default {
	name: 'contact-list',
	data() {
		return {
			contacts: contacts
		}
	}
}
</script>

<style lang="scss">
	.contact-list {

	}
</style>
