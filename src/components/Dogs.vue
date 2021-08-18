<template>
  <div class="container">
    <div class="row">
      <div v-if="test">hi</div>
      <div class="col-12 py-5">
          <h1>Dogs</h1>
      </div>
      <div class="row mb-3">
        <form class="col-12 col-sm-10 col-md-8 cl-lg-6" @submit.prevent="addDog()">
          <input
            v-model="newDog"
            type="text"
            class="form-control"
            placeholder="Create a new dog..."
          />
        </form>
      </div>
      <div class="row">
        <div class="col-12 col-sm-10 col-lg-6">
          <ul class="list-group">
            <li v-for="(dog, index) in poodles" :key="index">
                <span v-text="dog.name" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: "Dogs",
  data() {
    return {
      newDog: '',
      test: true
    }
  },
  computed: {
    ...mapGetters('dogs', ['poodles'])
  },
  methods: {
    ...mapActions('dogs', [
      'setDog'
    ]),
    ...mapMutations('dogs', [
      'SET_DOG'
    ]),
    addDog() {
      if (this.newDog.length > 0) {
        this.setDog({ name: this.newDog, breed: "poodle", age: 1 })
        this.SET_DOG({ name: this.newDog, breed: "poodle", age: 1 })
      }
      this.newDog = "";
    }
  }
}
</script>

<style>

</style>