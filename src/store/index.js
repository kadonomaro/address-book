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
				.update(contact);
			state.commit('addContact', contact);
		}
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		}
  }
})
