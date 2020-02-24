import Vue from 'vue'
import Vuex from 'vuex'
import contacts from '@/test/contacts.json';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		contacts: contacts
  },
  mutations: {
  },
  actions: {
  },
	getters: {
		getContacts(state) {
			return state.contacts;
		}
  }
})
