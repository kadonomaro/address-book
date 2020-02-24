<template>
	<div class="contact-list">
		<table class="contact-list__table table">
			<tbody>
				<tr>
					<th class="up" @click="sortBy('name')">Наименование</th>
					<th @click="sortBy('phone')">Телефон</th>
					<th @click="sortBy('email')">E-mail</th>
					<th @click="sortBy('location')">Адрес</th>
					<th>Тег</th>
				</tr>
				<tr v-for="contact in getSortedContacts" :key="contact.id">
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
			sortProp: 'name',
			sortDirection: 1 // 1 = asc, -1 = desc
		}
	},
	methods: {
		sortBy(prop) {
			this.sortDirection = this.sortDirection * -1;
			this.sortProp = prop;
		}
	},
	computed: {
		...mapGetters([
			'getContacts'
		]),
		getSortedContacts() {
			return this.getContacts.sort((a, b) => {
				if(a[this.sortProp] < b[this.sortProp]) return -1 * this.sortDirection;
				if(a[this.sortProp] > b[this.sortProp]) return 1 * this.sortDirection;
			});
		}
	}
}
</script>

<style lang="scss">
	.contact-list {
		&__table {
			th {
				position: relative;
				cursor: pointer;
				user-select: none;
				&::after {
					content: '';
					position: absolute;
					right: 5px;
				}
			}
			th.up {
				&::after {
					content: '\2191';
				}
			}
			th.down {
				&::after {
					content: '\2193;';
				}
			}
		}
	}
</style>
