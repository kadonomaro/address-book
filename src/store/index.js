import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts: []
  },
	mutations: {
		updateContacts(state, contacts) {
			state.contacts = contacts;
		},
		addContact(state, contact) {
			state.contacts.push(contact);
		},
		removeContact(state, contact) {
			const contactIndex = state.contacts.map((contact) => {
				return contact.id;
			}).indexOf(contact);
			state.contacts.splice(contactIndex, 1);
		}
  },
	actions: {
		async getContactsData(state) {
			const contacts = [];
			await db.ref('contacts')
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
			await db.ref('contacts')
				.child(contact.id)
				.update(contact)
			state.commit('addContact', contact);
		},
		deleteContacts(state, contactIdList) {
			contactIdList.forEach((contactId) => {
				db.ref('contacts')
					.child(contactId)
					.remove()
					.catch((error) => {
						console.warn('Контакт не существует');
					})
				state.commit('removeContact', contactId);
			});
		}
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		}
  }
})
