import { shallowMount } from '@vue/test-utils'
import CreateTodo from '@/components/CreateTodo'

describe('Test CreateTodo', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CreateTodo, {
      stubs: ['router-link'],
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
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
  it('TEST CASE 3: Push route', () => {
    wrapper.find('.link-test').trigger('click')
    const pushFn = jest.spyOn(wrapper.vm.$router, 'push')
    expect(pushFn).toHaveBeenCalledWith({ name: 'Dogs'} )
  })
})