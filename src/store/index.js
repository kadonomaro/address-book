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
		},
		auth: {
			error: ''
		}
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

		setAuthError(state, error) {
			state.auth.error = error;
		}
  },
	actions: {
		async getContactsData(state) {
			const contacts = [];
			await db.ref('/users/' + this.state.user.id)
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
			await db.ref('/users/' + this.state.user.id)
				.child('contacts')
				.child(contact.id)
				.update(contact)
			state.commit('addContact', contact);
		},
		deleteContacts(state, contactIdList) {
			contactIdList.forEach((contactId) => {
				db.ref('/users/' + this.state.user.id)
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
			await db.ref('/users/' + this.state.user.id)
				.child('contacts')
				.child(contact.id)
				.update(contact)
				.catch((error) => {
					console.warn('Контакт не существует');
				});
			state.commit('updateContact', contact);
		},

		login(state, user) {
			auth.signInWithEmailAndPassword(user.email, user.password)
				.then((data) => {
					router.push({ name: 'Home' });
				})
				.catch((error) => {
					state.commit('setAuthError', error.code)
				});

			auth.onAuthStateChanged((user) => {
				if (user) {
					const userInfo = {
						id: user.uid,
						name: user.displayName,
						email: user.email
					}
					state.commit('setUserInfo', userInfo);
					localStorage.setItem('user_info', JSON.stringify(userInfo));
				}
			})
		},

		logout() {
			auth.signOut()
				.then(() => {
					this.user = {};
					router.push({ name: 'Login' });
					localStorage.removeItem('user_info');
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
					state.commit('setAuthError', error.code);
				})
		}
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		},
		getUserInfo(state) {
			return state.user
		},
		getUserId(state) {
			if (state.user) {
				return state.user.id;
			}
		},

		getAuthError(state) {
			return state.auth.error;
		}
  }
})
