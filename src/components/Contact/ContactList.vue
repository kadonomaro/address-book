<template>
	<div class="contact-list">
		<div class="contact-list__head">

			<smart-filter
				class="contact-list__filter"
				:input-data="getSortedAndSeletedContacts"
				@filter="filterBy"
			/>

			<div class="contact-list__select">
				<v-selection-list
					:list="getContactsTags"
					:first-caption="'Выберите статус клиента'"
					@on-select="selectTagHandler"/>
			</div>

			<div class="contact-list__controls">
				<v-button
					:text="'Добавить'"
					:has-icon="true"
					:icon="'plus'"
					@on-click="isModalVisible = true;"
				/>
				<v-button
					style="margin-left:10px"
					v-if="checkedContacts.length"
					:text="'Удалить'"
					:has-icon="true"
					:icon="'minus'"
					@on-click="deleteContacts"
				/>
			</div>
		</div>

		<div class="table-wrapper">
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
						<th>Статус</th>
					</tr>
					<tr v-for="(contact, index) in items" :key="contact.id">
						<td>
							<div class="cell-inner">
								<span class="title">{{ index + 1 }}</span>
								<label class="custom-checkbox">
									<input class="custom-checkbox__input visually-hidden" type="checkbox" :value="contact.id" v-model="checkedContacts">
									<span class="custom-checkbox__input-custom"></span>
								</label>
							</div>
						</td>
						<td class="has-info" v-contact-info="contact">{{ contact.name }}</td>
						<td class="phone">
							<a :href="`tel:${contact.phone}`">{{ contact.phone | phone }}</a>
						</td>
						<td class="email">
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
		</div>


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
      @close="onCloseModal"
    >
      <template v-slot:header>
        <span>Добавить новый контакт</span>
      </template>
      <template v-slot:body>
        <add-contact-form @update-info="newContactInfo" />
      </template>
			<template v-slot:footer>
        <v-button :text="'ОК'" :disabled="!isValidContactForm" @on-click="addContact"/>
      </template>
    </v-modal>


		<v-preloader v-if="getLoadingStatus" :width="60" :height="60" />

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SmartFilter from '@/components/blocks/SmartFilter.vue';
import vButton from '@/components/blocks/vButton.vue';
import vModal from '@/components/blocks/vModal.vue';
import vSelectionList from '@/components/blocks/vSelectionList.vue';
import vPreloader from '@/components/partials/vPreloader.vue';
import AddContactForm from '@/components/Contact/AddContactForm.vue';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
	name: 'contact-list',
	components: {
		SmartFilter,
		vButton,
		vModal,
		AddContactForm,
		vSelectionList,
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
			contactForm: {},
			checkedContacts: [],
			selectedTag: ''
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
		selectTagHandler(selected) {
			this.selectedTag = selected;
		},
		onCloseModal() {
			this.isModalVisible = false;
			this.contactForm = {}
		},

		newContactInfo(info) {
			this.contactForm = info;
		},
		addContact() {
			this.isModalVisible = false;
			Object.assign(this.contactForm, {id: Date.now().toString()});
			this.$store.dispatch('addNewContact', this.contactForm);
		},
		deleteContacts() {
			this.$store.dispatch('deleteContacts', this.checkedContacts);
			this.checkedContacts.length = 0;
		}
	},
	computed: {
		...mapGetters([
			'getContacts',
			'getContactsTags',
			'getLoadingStatus'
		]),
		getSortedAndSeletedContacts() {
			return this.getContacts.sort((a, b) => {
				if(a[this.sortProp] < b[this.sortProp]) return -1 * this.sortDirection;
				if(a[this.sortProp] > b[this.sortProp]) return 1 * this.sortDirection;
			}).filter((item)=>{
				if (!this.selectedTag) return item;
				return item.tags.includes(this.selectedTag);
			});
		},
		isValidContactForm() {
			return this.contactForm.name ? true : false;
		}
	},
	watch: {
		filteredData(value) {
			this.setupPagination(value);
		},
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';
	@import '@/style/table.scss';
	@import '@/style/contact-info.scss';
	@import '@/style/pagination.scss';
	@import '@/style/checkbox.scss';

	.contact-list {
		padding: 20px 0;
		&__head {
			display: flex;
			margin-bottom: 20px;
			padding: 20px 30px;
			background-color: #ffffff;
			border: 1px solid $border-color;
			border-radius: 5px;
		}
		&__filter {
			margin-right: 10px;
		}
		&__select {
			margin-right: 10px;
		}
		&__controls {
			margin-left: auto;
		}
		&__table {
			margin-bottom: 20px;
			th {
				position: relative;
				user-select: none;
				&:first-child {
					white-space: nowrap;
				}
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
			td {
				box-sizing: border-box;
				&:not(:first-child) {
					width: 20%;
				}
				&:first-child {
					width: 70px;
				}
			}
			td.phone,
			td.email {
				white-space: nowrap;
			}
			td.has-info {
				position: relative;
				cursor: pointer;
			}

		}
	}


	@media ($size-mobile) {
		.contact-list {
			&__head {
				display: block;
				padding: 10px;
			}
			&__filter {
				margin: 0 0 10px;
			}
			&__select {
				margin: 0 0 10px;
			}
		}
	}
</style>
