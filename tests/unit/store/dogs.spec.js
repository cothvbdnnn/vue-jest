import Dogs from '@/store/modules/dogs'

describe('Dogs', () => {
  let { state, getters, actions, mutations } = Dogs

  state = {
    dogs: [
      { name: "lucky", breed: "poodle", age: 1 },
      { name: "pochy", breed: "dalmatian", age: 2 },
      { name: "blackie", breed: "poodle", age: 4 }
    ]
  }

  const newDog = { name: 'hi', breed: 'hi', age: 3 }

  it('TEST CASE 1: Get poodle', () => {
    const poodles = getters.poodles(state)
    expect(poodles).toEqual([ state.dogs[0], state.dogs[2]])
  })
  it('TEST CASE 2: Get poodle by age', () => {
    const poodles = [ state.dogs[0], state.dogs[2]]
    const poodlesByAge = getters.poodlesByAge(state, { poodles })(1)
    expect(poodlesByAge).toEqual([state.dogs[0]])
  })
  it('TEST CASE 3: Action setDog ', () => {
    const commit = jest.fn()
    actions.setDog({ commit }, newDog)
    expect(commit).toHaveBeenCalledWith('SET_DOG', newDog)
  })
  it('TEST CASE 4: Mutations SET_DOG', () => {
    mutations.SET_DOG(state, newDog)
    expect(state.dogs[3]).toEqual(newDog)
  })
})