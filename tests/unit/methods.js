import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import bizflyStubs from './stubs'
import { routes } from '@/router/index'
import dogs from '@/store/modules/dogs'

export const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const mergeModules = {
  dogs
}

export const createStore = (objectModules = {}) => {
  return new Vuex.Store({
    modules: {
      ...mergeModules,
      ...objectModules
    }
  })
}

export const createRouter = (arrayRoutes = []) => {
  return new VueRouter({ 
    routes: [
      ...routes,
      ...arrayRoutes
    ]
  })
}

export const createWrapper = (component, options = {}) => {
  return shallowMount(component, {
    stubs: bizflyStubs,
    store: createStore(),
    router: createRouter(),
    localVue,
    ...options
  })
}