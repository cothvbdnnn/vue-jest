const state = {
  dogs: []
}

const getters = {
  poodles: (state) => {
    return state.dogs.filter(dog => dog.breed === "poodle")
  },
  poodlesByAge: (state, getters) => (age) => {
    return getters.poodles.filter(dog => dog.age === age)
  }
}

const mutations = {
  SET_DOG(state, newDog) {
    state.dogs.push(newDog)
  }
}

const actions = {
  setDog({ commit }, newDog) {
    commit('SET_DOG', newDog)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}