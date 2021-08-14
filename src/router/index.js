import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
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
})