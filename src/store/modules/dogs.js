const state = {
  dogs: [
    { name: "lucky", breed: "poodle", age: 1 },
    { name: "pochy", breed: "dalmatian", age: 2 },
    { name: "blackie", breed: "poodle", age: 4 }
  ]
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