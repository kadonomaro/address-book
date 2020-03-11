<template>
	<div class="contact-list">
		<div class="contact-list__head">
			<smart-filter :input-data="getSortedContacts" @filter="filterBy"/>
			<v-button
				:text="'Добавить'"
				:has-icon="true"
				@on-click="isModalVisible = true;"
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
				<tr v-for="(contact, index) in items" :key="contact.id">
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

    <paginate
      v-if="filteredData.length > pageSize"
      v-model="page"
      :page-count="pageCount"
      :page-range="pageRange"
      :click-handler="pageChangeHandler"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'">
    </paginate>

		<v-modal
      v-if="isModalVisible"
      @close="isModalVisible = false"
    >
      <template v-slot:header>
        <span>Добавить новый контакт</span>
      </template>
      <template v-slot:body>
        <add-contact-form @update-info="newContactInfo" />
      </template>
			<template v-slot:footer>
        <v-button style="margin-left: 10px;" :text="'ОК'" @on-click="addContact"/>
      </template>
    </v-modal>

		<v-preloader v-if="!getContacts.length" :width="60" :height="60" />

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SmartFilter from '@/components/SmartFilter.vue';
import vButton from '@/components/Blocks/vButton.vue';
import vModal from '@/components/Blocks/vModal.vue';
import AddContactForm from '@/components/Contact/AddContactForm.vue';
import vPreloader from '@/components/vPreloader.vue';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
	name: 'contact-list',
	components: {
		SmartFilter,
		vButton,
		vModal,
		AddContactForm,
		vPreloader
	},
	mixins: [paginationMixin],
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
			isModalVisible: false,
			contactForm: {}

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
		newContactInfo(info) {
			this.contactForm = info;
		},
		addContact() {
			this.isModalVisible = false;
			Object.assign(this.contactForm, {id: Date.now().toString()});
			this.$store.dispatch('addNewContact', this.contactForm);
		},
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
	},
	watch: {
		filteredData(value) {
			this.setupPagination(value);
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';
	@import '@/style/table.scss';
	@import '@/style/contact-info.scss';
	@import '@/style/pagination.scss';

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
			margin-bottom: 20px;
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
