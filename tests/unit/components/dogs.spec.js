import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Dogs from '@/components/Dogs'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dogs: {
      namespaced: true,
      state: {
        dogs: [
          { name: "lucky", breed: "poodle", age: 1 },
          { name: "pochy", breed: "dalmatian", age: 2 },
          { name: "blackie", breed: "poodle", age: 4 }
        ]
      },
      getters: {
        poodles: (state) => {
          return state.dogs.filter(dog => dog.breed === "poodle")
        }
      },
      mutations: {
        SET_DOG() {}
      },
      actions: {
        setDog() {}
      }
    }
  }
})

let wrapper
beforeEach(() => {
  wrapper = shallowMount(Dogs, { 
    store, 
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Dogs', () => {
  it('TEST CASE 1: Render poodles', () => {
    expect(wrapper.find('ul').text()).toEqual('luckyblackie')
  })
  it('TEST CASE 2: Add dog with form has empty value', () => {
    wrapper.find('form').trigger('submit.prevent')
    // expect(store.dispatch('setDog')).toBeUndefined()
  })
  it('TEST CASE 3: Add dog with form has value', async () => {
    const dispatch = jest.spyOn(Dogs.methods, 'setDog')
    const commit = jest.spyOn(Dogs.methods, 'SET_DOG')
    wrapper = shallowMount(Dogs, {
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


// import { shallowMount } from '@vue/test-utils'
// import Dogs from '@/components/Dogs'

// let wrapper
// beforeEach(() => {
//   wrapper = shallowMount(Dogs, { 
//     mocks: {
//       namespaced: true,
//       $store: {
//         state: { }
//       }
//     }
//   })
// })

// afterEach(() => {
//   wrapper.destroy()
// })

// it("renders a username using a mock store", () => {
// })