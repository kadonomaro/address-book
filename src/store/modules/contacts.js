import { db } from '@/main';
import store from '..';


export default {
	state: {
		contacts: [],
	},
	mutations: {
		updateContacts(state, contacts) {
			state.contacts = contacts;
		},

		updateContact(state, contact) {
			const contactIndex = state.contacts.map((contact) => {
				return contact.id;
			}).indexOf(contact);
			state.contacts[contactIndex] = contact;
		},

		addContact(state, contact) {
			state.contacts.push(contact);
		},

		removeContact(state, contact) {
			const contactIndex = state.contacts.map((contact) => {
				return contact.id;
			}).indexOf(contact);
			state.contacts.splice(contactIndex, 1);
		},

		setUserInfo(state, data) {
			state.user = data;
		},

		setAuthError(state, [error, type]) {
			state.error[type] = error;
		}
	},
	actions: {
		async getContactsData(state) {
			const contacts = [];
			await db.ref('/users/' + store.state.auth.user.id)
				.child('contacts')
				.once('value')
				.then((snapshot) => {
					snapshot.forEach((child) => {
						const contact = child.val();
						contacts.push(contact);
					});
					state.commit('updateContacts', contacts);
				});
		},

		async addNewContact(state, contact) {
			await db.ref('/users/' + store.state.auth.user.id)
				.child('contacts')
				.child(contact.id)
				.update(contact)
			state.commit('addContact', contact);
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
				state.commit('removeContact', contactId);
			});
		},

		async setContactChange(state, contact) {
			await db.ref('/users/' + store.state.auth.user.id)
				.child('contacts')
				.child(contact.id)
				.update(contact)
				.catch((error) => {
					console.warn('Контакт не существует');
				});
			state.commit('updateContact', contact);
		},
	},
	getters: {
		getContacts(state) {
			return state.contacts;
		},
	}
};
