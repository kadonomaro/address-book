<template>
	<div class="contact-list">
		<smart-filter :input-data="getSortedContacts" @filter="filterBy"/>
		<table class="contact-list__table table">
			<tbody>
				<tr>
					<th>№ п/п</th>
					<th
						class="sortable"
						:class="{
							'up': sortFields.find(field => field.name === 'name').direction === 'up',
							'down': sortFields.find(field => field.name === 'name').direction === 'down'
						}"
						@click="sortBy('name')">Наименование
					</th>
					<th
						class="sortable"
						:class="{
							'up': sortFields.find(field => field.name === 'phone').direction === 'up',
							'down': sortFields.find(field => field.name === 'phone').direction === 'down'
						}"
						@click="sortBy('phone')">Телефон
					</th>
					<th
						class="sortable"
						:class="{
							'up': sortFields.find(field => field.name === 'email').direction === 'up',
							'down': sortFields.find(field => field.name === 'email').direction === 'down'
						}"
						@click="sortBy('email')">E-mail
					</th>
					<th
						class="sortable"
						:class="{
							'up': sortFields.find(field => field.name === 'location').direction === 'up',
							'down': sortFields.find(field => field.name === 'location').direction === 'down'
						}"
						@click="sortBy('location')">Адрес
					</th>
					<th>Теги</th>
				</tr>
				<tr v-for="(contact, index) in filteredData" :key="contact.id">
					<td>{{ index + 1 }}</td>
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
import SmartFilter from '@/components/SmartFilter.vue';

export default {
	name: 'contact-list',
	components: {
		SmartFilter
	},
	data() {
		return {
			sortProp: 'name',
			sortDirection: 0,
			sortFields: [
				{ name: 'name', direction: null },
				{ name: 'phone', direction: null },
				{ name: 'email', direction: null },
				{ name: 'location', direction: null },
			],
			filteredData: []
		}
	},
	methods: {
		sortBy(prop) {
			// 1 = asc, -1 = desc
			this.sortDirection = this.sortDirection === 0 ? this.sortDirection = 1: this.sortDirection *= -1 ;
			this.sortProp = prop;

			const field = this.sortFields.find((field) => {
				return field.name === prop;
			});
			field.direction = this.sortDirection === 1 ? 'up' : 'down';
		},
		filterBy(payload) {
			this.filteredData = payload;
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
		padding: 0 10px;
		&__table {
			th {
				position: relative;
				user-select: none;
			}
			th.sortable {
				cursor: pointer;
				&::after {
					content: '\2195';
					position: absolute;
					right: 5px;
				}
			}
			th.sortable.up {
				&::after {
					content: '\2191';
				}
			}
			th.sortable.down {
				&::after {
					content: '\2193';
				}
			}
		}
	}
</style>
