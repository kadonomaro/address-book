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
				.child(Date.now().toString())
				.update(contact);

		}
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		}
  }
})
