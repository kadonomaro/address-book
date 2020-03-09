import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/common.scss'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import phoneFilter from '@/filters/phone.filter';
import contactInfoDirective from '@/directives/contact-info.directive';

Vue.filter('phone', phoneFilter);
Vue.directive('contact-info', contactInfoDirective);

Vue.config.productionTip = false

const firebaseDevConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: '1:664834727086:web:a7dd48b4f891b8e38c213f',
};

firebase.initializeApp(firebaseDevConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
