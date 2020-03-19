import router from '@/router'
import { auth, storage } from '@/main';

export default {
	state: {
		photoURL: '',
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
		setUserInfo(state, data) {
			state.user = data;
		},

		setAuthError(state, [error, type]) {
			state.error[type] = error;
		}
	},
	actions: {
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
						photoURL: user.photoURL,
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

		updateUserProfile(state, user) {
			const currentUser = auth.currentUser;

			const fileRef = storage.ref().child('users').child(currentUser.uid).child(`user-${currentUser.uid}-avatar.jpg`);
			//переделать без вложености
			fileRef.put(user.photo)
				.then(() => {
					fileRef.getDownloadURL()
						.then((url) => {
							currentUser.updateProfile({
								displayName: user.name,
								photoURL: url
							})
								.then(() => {
									console.log('user profile updated');
								})
								.catch((error) => {
									console.warn(error);
								});
						})
				});

			if (user.email) {
				currentUser.updateEmail(user.email)
				.catch((error) => {
					console.warn(error);
				});
			}

		}
	},
	getters: {
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
};


async function uploadImage(state, image, userId) {
	const fileRef = storage.ref()
		.child('users')
		.child(userId)
		.child(`user-${userId}-avatar.jpg`);
	const uploadTask = await fileRef.put(image);
	const downloadUrl = await uploadTask.ref.getDownloadURL();
	state.photoURL = downloadUrl;
	console.log(state);
	console.log(downloadUrl);
};
