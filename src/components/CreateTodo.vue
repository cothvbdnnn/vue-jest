<template>
  <div>
    <div class="col-12 mb-3">
      <button type="submit" class="btn btn-outline-primary link-test"
        @click="push"
      >
        Link
      </button>
    </div>
    <form class="col-12 col-sm-10 col-md-8 cl-lg-6" @submit.prevent="addTodo()">
      <input
        v-model="newTodo"
        type="text"
        class="form-control"
        placeholder="Create a new to-do..."
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: ""
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.length > 0) {
        this.$emit("on-new-todo", this.newTodo);
      }
      this.newTodo = "";
    },
    push() {
      this.$router.push({ name: "Dogs" })
    }
  }
};
</script>

<style lang="scss" scoped></style>
