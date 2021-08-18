import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: () => import('../components/TodoList.vue')
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: () => import('../components/Dogs.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/api/list',
    name: 'ListApi',
    component: () => import('../components/ListApi.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router