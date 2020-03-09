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
						const contact = {
							id: child.val().id,
							age: child.val().age,
							email: child.val().email,
							location: child.val().location,
							name: child.val().name,
							phone: child.val().phone,
							sex: child.val().sex,
							tags: child.val().tags
						}
						contacts.push(contact);
					});
					state.commit('updateContacts', contacts);
				});

			// await db.collection('contacts')
			// 	.get()
			// 	.then((snapshot) => {
			// 		snapshot.forEach((doc) => {
			// 			console.log(doc);
			// 		})
			// 	})
		}
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		}
  }
})
