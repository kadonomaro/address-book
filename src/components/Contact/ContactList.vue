<template>
	<div class="contact-list">
		<div class="contact-list__head">
			<smart-filter :input-data="getSortedContacts" @filter="filterBy"/>
			<v-button
				:text="'Добавить'"
				:has-icon="true"
				@on-click="addContactForm.isModalVisible = true;"
			/>
		</div>

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
						@click="sortBy('name')">Имя
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
					<td class="has-info" v-contact-info="contact">{{ contact.name }}</td>
					<td>
						<a :href="`tel:${contact.phone}`">{{ contact.phone | phone }}</a>
					</td>
					<td>
						<a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
					</td>
					<td>{{ contact.location }}</td>
					<td>
						<span
							:class="{'tag': tag}"
							v-for="(tag, index) in contact.tags"
							:key="index"
						>{{ tag }}</span>
					</td>
				</tr>
				<tr>
					<td v-if="!filteredData.length && getContacts.length" colspan="6">Ничего не найдено</td>
				</tr>
			</tbody>
		</table>

		<v-modal
      v-show="addContactForm.isModalVisible"
      @close="addContactForm.isModalVisible = false"
      @action="addContact"
    >
      <template v-slot:header>
        <span>Добавить новый контакт</span>
      </template>
      <template v-slot:body>
        <span>{{ Date.now().toString() }}</span>
      </template>
			<template v-slot:footer>
        <span>{{ Date.now().toString() }}</span>
      </template>
    </v-modal>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SmartFilter from '@/components/SmartFilter.vue';
import VButton from '@/components/Blocks/VButton.vue';
import VModal from '@/components/Blocks/VModal.vue';

export default {
	name: 'contact-list',
	components: {
		SmartFilter,
		VButton,
		VModal
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
			filteredData: [],

			addContactForm: {
				isModalVisible: false,
			}

		}
	},
	mounted(){
		this.$store.dispatch('getContactsData');
	},
	methods: {
		sortBy(prop) {
			if (this.filteredData.length) {
				// 1 = asc, -1 = desc
				this.sortDirection = this.sortDirection === 0 ? this.sortDirection = 1: this.sortDirection *= -1 ;
				this.sortProp = prop;

				const field = this.sortFields.find((field) => {
					return field.name === prop;
				});
				field.direction = this.sortDirection === 1 ? 'up' : 'down';
			}
		},
		filterBy(payload) {
			this.filteredData = payload;
		},
		addContact() {
			this.addContactForm.isModalVisible = false;
			console.log('Контакт добавлен');
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
	@import '@/style/variables.scss';
	@import '@/style/table.scss';
	@import '@/style/contact-info.scss';

	.contact-list {
		max-width: 1600px;
		margin: 0 auto;
		padding: 20px 10px;
		&__head {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20px;
			padding: 20px 30px;
			background-color: #ffffff;
			border: 1px solid $border-color;
			border-radius: 5px;
		}
		&__table {
			th {
				position: relative;
				user-select: none;
			}
			th.sortable {
				cursor: pointer;
				transition: background-color 0.2s ease-in;
				&:hover {
					background-color: $background-color;
				}
				&::after {
					content: '\2195';
					position: absolute;
					right: 5px;
					top: 50%;
					color: $main-color;
					font-size: 18px;
					transform: translateY(-50%);
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
			td.has-info {
				position: relative;
				cursor: pointer;
			}
		}
	}
</style>
