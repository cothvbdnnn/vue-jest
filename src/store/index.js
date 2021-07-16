import Vue from 'vue'
import Vuex from 'vuex'
import dogs from "./modules/dogs";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dogs
  }
})

