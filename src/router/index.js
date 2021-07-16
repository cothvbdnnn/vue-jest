import Vue from 'vue'
import Router from 'vue-router'
import Dogs from '@/components/Dogs'
import TodoList from '@/components/TodoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/dogs',
      name: 'Dogs',
      component: Dogs
    }
  ]
})