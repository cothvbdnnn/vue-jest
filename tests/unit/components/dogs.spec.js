import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DogsComponent from '@/components/Dogs'
import dogs from '@/store/modules/dogs'

const localVue = createLocalVue()
localVue.use(Vuex)

const state = {
  dogs: [
    { name: "test", breed: "poodle", age: 1 },
  ]
}

const store = new Vuex.Store({
  modules: {
    dogs: { 
      ...dogs, 
      state 
    }
  }
})

let wrapper
beforeEach(() => {
  wrapper = shallowMount(DogsComponent, { 
    store, 
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Dogs', () => {
  it('Render poodles', () => {
    expect(wrapper.find('ul').text()).toEqual('test')
  })
  it('Add dog with form has empty value', () => {
    const dispatch = jest.spyOn(DogsComponent.methods, 'setDog')
    wrapper.find('form').trigger('submit.prevent')
    expect(dispatch).toHaveBeenCalledTimes(0)
  })
  it('Add dog with form has value', async () => {
    const dispatch = jest.spyOn(DogsComponent.methods, 'setDog')
    const commit = jest.spyOn(DogsComponent.methods, 'SET_DOG')
    wrapper = shallowMount(DogsComponent, {
      store, 
      localVue
    })
    expect(wrapper.vm.newDog).toEqual('')
    const input = wrapper.find('input')
    const newDog = 'test'
    input.setValue(newDog)
    expect(wrapper.vm.newDog).toEqual(newDog)
    await wrapper.find('form').trigger('submit.prevent')
    const data = { 
      name: newDog, 
      breed: "poodle", 
      age: 1
    }
    expect(commit).toHaveBeenCalledWith(data)
    expect(dispatch).toHaveBeenCalledWith(data)
    expect(wrapper.vm.newDog).toEqual('')
  })
})
