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
		error: {
			login: '',
			register: ''
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

		setAuthError(state, [error, type]) {
			state.error[type] = error;
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
					state.commit('setAuthError', [error.code, 'login'])
				});


			auth.onAuthStateChanged((user) => {
				if (user) {
					const currentUser = auth.currentUser;
					const userInfo = {
						id: user.uid,
						name: user.displayName,
						email: user.email,
						photoUrl: user.photoUrl,
						creationTime: currentUser.metadata.creationTime,
						lastSignInTime: currentUser.metadata.lastSignInTime
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
					state.commit('setAuthError', [error.code, 'register']);
				})
		},

		updateUserProfile(state, user) {
			const currentUser = auth.currentUser;

			currentUser.updateProfile({
				displayName: user.name,
				photoUrl: user.photo
			}).catch((error) => {
				console.warn(error);
			});

			currentUser.updateEmail(user.email)
				.catch((error) => {
					console.warn(error);
				});
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

		getLoginError(state) {
			return state.error.login
		},
		getRegisterError(state) {
			return state.error.register;
		}
	}
});
