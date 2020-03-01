import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/common.scss'

import phoneFilter from '@/filters/phone.filter';
import contactInfoDirective from '@/directives/contact-info.directive';

Vue.filter('phone', phoneFilter);
Vue.directive('contact-info', contactInfoDirective);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
