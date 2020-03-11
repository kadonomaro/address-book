import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/common.scss';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

import YmapPlugin from 'vue-yandex-maps';
import Paginate from 'vuejs-paginate';

import phoneFilter from '@/filters/phone.filter';
import contactInfoDirective from '@/directives/contact-info.directive';
import escapeDirective from '@/directives/escape.directive';
import autofocusDirective from '@/directives/autofocus.directive';

Vue.filter('phone', phoneFilter);
Vue.directive('contact-info', contactInfoDirective);
Vue.directive('escape', escapeDirective);
Vue.directive('autofocus', autofocusDirective);

Vue.config.productionTip = false;

const firebaseDevConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};


const firebaseProdConfig = {
  apiKey: 'AIzaSyBSgWzG-knX-jAFJ_oCmsGLJgvvY8lXfmE',
  authDomain: 'address-book-2020.firebaseapp.com',
  databaseURL: 'https://address-book-2020.firebaseio.com',
  projectId: 'address-book-2020',
  storageBucket: 'address-book-2020.appspot.com',
  messagingSenderId: '1085721217560',
  appId: '9997739f-f8c2-4371-ab19-02877c805d38',
};


const yMapSettings = {
	apiKey: process.env.VUE_APP_YMAP_API_KEY,
	lang: 'ru_RU',
	coordorder: 'latlong',
	version: '2.1'
};


firebase.initializeApp(process.env.NODE_ENV === 'production' ? firebaseProdConfig : firebaseDevConfig);
const db = firebase.database();
const auth = firebase.auth();
export { db, auth };

Vue.use(YmapPlugin, yMapSettings);
Vue.component('paginate', Paginate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
