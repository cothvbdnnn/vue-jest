import { shallowMount, createLocalVue } from '@vue/test-utils'
import CreateTodo from '@/components/CreateTodo'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/dogs',
      name: 'Dogs',
      component: () => import('@/components/Dogs.vue')
    }
  ]
})
describe('Test CreateTodo', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CreateTodo, {
      localVue,
      router
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('TEST CASE 1: Add todo with form has empty value', () => {
    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('on-new-todo')).toBeUndefined()
  })
  it('TEST CASE 2: Add todo with form has value', async () => {
    const fn = jest.spyOn(CreateTodo.methods, 'addTodo')
    wrapper = shallowMount(CreateTodo)
    expect(wrapper.vm.newTodo).toEqual('')
    const input = wrapper.find('input')
    const newValue = 'test'
    input.setValue(newValue)
    expect(wrapper.vm.newTodo).toEqual(newValue)
    wrapper.find('form').trigger('submit.prevent')
    expect(fn).toHaveBeenCalled()
    expect(wrapper.emitted('on-new-todo')[0][0]).toEqual(newValue)
    expect(wrapper.vm.newTodo).toEqual('')
  })
  it('TEST CASE 3: Push route', async () => {
    const link = wrapper.find('.link-test')
    await link.trigger('click')
    expect(wrapper.vm.$route.path).toBe('/dogs')
  })
})