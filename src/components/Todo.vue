<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
      :class="{ completed }"
      @click="$emit('on-toggle')"
      v-if="!isEditing"
    >
      <span class="des">{{ description }}</span>
    </button>
    <form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
      <div class="row mx-0">
        <input
          type="text"
          class="form-control form-edit"
          v-model="newTodoDescription"
          ref="newTodo"
        />
        <button type="submit" class="btn btn-outline-primary ml-2 btn-submit">
          Submit
        </button>
      </div>
    </form>
    <button
      @click="startEditing()"
      class="btn btn-outline-primary border-0 ml-2 btn-edit"
    >
      Edit
    </button>
    <button
      @click="deleteTodo()"
      class="btn btn-outline-danger border-0 btn-remove"
    >
      Remove
    </button>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      newTodoDescription: ""
    };
  },
  props: {
    description: String,
    completed: Boolean
  },
  computed: {
    capText() {
      return this.newTodoDescription.toUpperCase()
    }
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newTodoDescription = this.description;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newTodo.focus());
      }
    },
    finishEditing() {
      this.isEditing = false;
      this.$emit("on-edit", this.newTodoDescription);
    },
    deleteTodo() {
      this.$emit("on-delete");
    }
  }
};
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
.form-edit {
  width: auto;
}
</style>
