<template>
  <div>
    <h1 class="text-center mt-5">Login</h1>
    <el-form ref="formLogin" class="mt-3">
      <el-input placeholder="Email" class="email" v-model="formLogin.email" />
      <el-input
        placeholder="Password"
        class="password my-2"
        v-model="formLogin.password"
        type="password"
      />
      <el-button :loading="loading" class="submit" type="primary" @click.native="onSubmit()">
        Sign In
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { axios, AUTH_TOKEN } from "@/utils/axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      try {
        const signIn = await axios.post("auth/signin", this.formLogin)
        localStorage.setItem("userEmail", `${signIn.data.email}`);
        Cookies.set(AUTH_TOKEN, signIn.data.auth_token);
        this.loading = false;
        this.$router.push("api/list");
      } catch (error) {
          this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 300px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-flow: column;
}
.el-pagination {
  max-width: 600px;
  margin: auto;
}
</style>