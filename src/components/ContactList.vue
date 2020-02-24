<template>
	<div class="contact-list">
		<table class="contact-list__table table">
			<tbody>
				<tr>
					<th>Наименование</th>
					<th>Телефон</th>
					<th>E-mail</th>
					<th>Адрес</th>
					<th>Тег</th>
				</tr>
				<tr v-for="contact in getContacts" :key="contact.id">
					<td>{{ contact.name }}</td>
					<td>
						<a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
					</td>
					<td>
						<a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
					</td>
					<td>{{ contact.location }}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import '@/style/table.scss';
import { mapGetters } from 'vuex';

export default {
	name: 'contact-list',
	data() {
		return {

		}
	},
	computed: {
		...mapGetters([
			'getContacts'
		])
	}
}
</script>

<style lang="scss">
	.contact-list {

	}
</style>
