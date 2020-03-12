import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
		name: 'Home',
		meta: {layout: 'main'},
    component: Home
  },
  {
    path: '/about',
		name: 'About',
		meta: {layout: 'main'},
    component: () => import('../views/About.vue')
	},
	{
    path: '/login',
		name: 'Login',
		meta: {layout: 'auth'},
    component: () => import('../views/Login.vue')
	},
	{
		path: '/contact/:id',
		name: 'contact-item',
		meta: {layout: 'main'},
		component: () => import('@/components/Contact/ContactItem.vue')
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
