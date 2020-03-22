import { db } from '@/main';
import store from '..';


export default {
	state: {
		contacts: [],
		loading: false
	},
	mutations: {
		UPDATE_CONTACTS(state, contacts) {
			state.contacts = contacts;
		},

		UPDATE_CONTACT(state, contact) {
			const contactIndex = state.contacts.map((contact) => {
				return contact.id;
			}).indexOf(contact);
			state.contacts[contactIndex] = contact;
		},

		ADD_CONTACT(state, contact) {
			state.contacts.push(contact);
		},

		REMOVE_CONTACT(state, contact) {
			const contactIndex = state.contacts.map((contact) => {
				return contact.id;
			}).indexOf(contact);
			state.contacts.splice(contactIndex, 1);
		},

		CHANGE_LOADING_STATUS(state, status) {
			state.loading = status;
		}
	},
	actions: {
		async getContactsData(state) {
			const contacts = [];
			state.commit('CHANGE_LOADING_STATUS', true);
			await db.ref('/users/' + store.state.auth.user.id)
				.child('contacts')
				.once('value')
				.then((snapshot) => {
					snapshot.forEach((child) => {
						const contact = child.val();
						contacts.push(contact);
					});
					state.commit('UPDATE_CONTACTS', contacts);
					state.commit('CHANGE_LOADING_STATUS', false);
				});
		},

		async addNewContact(state, contact) {
			await db.ref('/users/' + store.state.auth.user.id)
				.child('contacts')
				.child(contact.id)
				.update(contact)
			state.commit('ADD_CONTACT', contact);
		},

		deleteContacts(state, contactIdList) {
			contactIdList.forEach((contactId) => {
				db.ref('/users/' + store.state.auth.user.id)
					.child('contacts')
					.child(contactId)
					.remove()
					.catch((error) => {
						console.warn('Контакт не существует');
					});
				state.commit('REMOVE_CONTACT', contactId);
			});
		},

		async updateContact(state, contact) {
			await db.ref('/users/' + store.state.auth.user.id)
				.child('contacts')
				.child(contact.id)
				.update(contact)
				.catch((error) => {
					console.warn('Контакт не существует');
				});
			state.commit('UPDATE_CONTACT', contact);
		},
	},
	getters: {
		getContacts(state) {
			return state.contacts;
		},
		getLoadingStatus(state) {
			return state.loading;
		}
	}
};
