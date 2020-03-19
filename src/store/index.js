import Vue from 'vue'
import Vuex from 'vuex'
import authModule from '@/store/modules/auth.js';
import contactsModule from '@/store/modules/contacts.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		auth: authModule,
		contacts: contactsModule,
	},
});
