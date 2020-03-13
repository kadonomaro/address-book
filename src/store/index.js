import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '@/main';
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts: [],
		user: {
			id: null,
			name: '',
			email: ''
		}
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
		},

		setUserInfo(state, data) {
			state.user = data;
			console.log(state.user);
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
		},

		login(state, user) {
			auth.signInWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					router.push({ name: 'Home' })
				})
				.catch((error) => {
					console.warn(error.message);
				});

			auth.onAuthStateChanged((user) => {
				if (user) {
					state.commit('setUserInfo', {
						id: user.uid,
						name: user.displayName,
						email: user.email
					})
				}
			})
		},
		createUser(state, user) {
			auth.createUserWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					data.user
						.updateProfile({
							displayName: user.name
						})
						.then(() => {
							router.push({ name: 'Login' })
						})
				})
				.catch((error) => {
					console.warn(error.message);
				})

		}
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		},
		getUserInfo(state) {
			return state.user
		}
  }
})
