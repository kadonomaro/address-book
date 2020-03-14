import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
		name: 'Home',
		meta: {
			layout: 'main',
			requiresAuth: true
		},
    component: Home
  },
  {
    path: '/about',
		name: 'About',
		meta: {
			layout: 'main',
			requiresAuth: true
		},
    component: () => import('../views/About.vue')
	},
	{
    path: '/login',
		name: 'Login',
		meta: {
			layout: 'auth'
		},
    component: () => import('../views/Login.vue')
	},
	{
    path: '/register',
		name: 'Register',
		meta: {
			layout: 'auth'
		},
    component: () => import('../views/Register.vue')
	},
	{
		path: '/contact/:id',
		name: 'contact-item',
		meta: {
			layout: 'main',
			requestAuth: true
		},
		component: () => import('@/components/Contact/ContactItem.vue')
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
