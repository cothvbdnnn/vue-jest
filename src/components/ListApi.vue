<template>
  <div>
    <el-row class="row">
      <el-col :span="12" class="form">
        <h2>Add</h2>
        <el-form class="mt-3">
          <el-row>
            <el-col :span="14">
              <el-input
                placeholder="Add"
                type="text"
                v-model="formAddTodo.title"
              />
            </el-col>
            <el-col :span="8">
              <el-button
                :loading="loadingCreate"
                type="primary"
                @click="submitFormAddTodo"
                >Add</el-button
              >
            </el-col>
          </el-row>
        </el-form>
        <el-form class="mt-3" ref="formEdit">
          <h2>Edit</h2>
          <el-row>
            <el-col :span="14">
              <el-input
                placeholder="Edit"
                type="text"
                v-model="formEditTodo.title"
              />
            </el-col>
            <el-col :span="8">
              <el-button
                :loading="loadingEdit"
                type="primary"
                @click="submitFormEditTodo"
                >Edit</el-button
              >
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="12">
        <h2 class="mt-5 text-center">List</h2>
        <div v-for="(item, id) in listTodo" :key="id">
          <el-row class="item">
            <el-col :span="11">
              <p>
                <b>{{ item.title }}</b>
              </p>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="editTodo(item)">Edit</el-button>
            </el-col>
            <el-col :span="6">
              <el-button
                :loading="loadingRemove"
                type="primary"
                @click="submitDel(item.id)"
                >Remove</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { axios } from "@/utils/axios";
export default {
  name: "List",
  data() {
    return {
      listTodo: [],
      loadingRemove: false,
      loadingCreate: false,
      loadingEdit: false,
      formAddTodo: {
        title: "",
      },
      formEditTodo: {
        id: "",
        title: "",
      }
    };
  },
  beforeMount() {
    this.getData();
    addEventListener("loadTodo", this.getData);
    addEventListener("detailEdit", this.updateTitle);
    this.$on("hook:beforeDestroy", () => {
      removeEventListener("loadTodo", this.getData);
      removeEventListener("detailEdit", this.updateTitle);
    });
  },
  methods: {
    updateTitle(event) {
      this.formEditTodo = event.detail;
    },
    async submitFormAddTodo() {
      this.loadingCreate = true;
      await axios.post("api/v1/todos", this.formAddTodo).catch(() => {
        this.loadingCreate = false;
      });
      this.formAddTodo.title = "";
      this.loadingCreate = false;
      dispatchEvent(new CustomEvent("loadTodo"));
    },
    async submitFormEditTodo() {
      this.loadingEdit = true;
      await axios.put(
        `api/v1/todos/${this.formEditTodo.id}`,
        this.formEditTodo
      );
      dispatchEvent(new CustomEvent("loadTodo"));
      this.formEditTodo.title = "";
      this.loadingEdit = false;
    },
    async getData() {
      const params = {
        page: 1,
        limit: 5,
      };
      const response = await axios.get(`api/v1/todos?${params}`);
      this.listTodo = response.data;
    },
    async submitDel(idTodo) {
      this.loadingRemove = true;
      await axios.delete(`api/v1/todos/${idTodo}`);
      this.loadingRemove = false;
      this.getData();
    },
    editTodo({ id, title }) {
      dispatchEvent(
        new CustomEvent("detailEdit", {
          detail: {
            id: id,
            title: title,
          },
        })
      );
    },
  },
};
</script>

<style scoped>
.row {
  margin: auto;
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
}
.item p {
  padding: 0 10px;
  margin: 0;
  height: 37px;
  border-radius: 2px;
  border: 1px solid #2a74d4;
  background-color: #fff;
  color: #2a74d4;
  width: 100%;
  line-height: 37px;
}
.item {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 10px;
  align-items: center;
}
</style>