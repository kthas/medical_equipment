<template>
  <el-container :style="containerStype">
    <el-main>
      <el-card class="box-card">
        <el-form ref="form" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginButton">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { login } from "./api/loginApi";
export default {
  data() {
    return {
      containerStype: {
        backgroundImage: "url(" + require("@/assets/image/backpage.jpeg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100%",
      },
      username: "",
      password: "",
    };
  },
  methods: {
    loginButton() {
      localStorage.removeItem("token");
      const data = {
        username: this.username,
        password: this.password,
      };
      login(data).then((res) => {
        if (res.code === 200) {
          const data = res.data;
          const token = data.token.token;
          localStorage.setItem("token", token);
          localStorage.setItem("pids", JSON.stringify(res.data.pids));
          console.log(localStorage.getItem("pids"));
          this.$message.success("登陆成功");
          this.$router.push({ name: "index", params: { token: token } }); // 路径名name
        }
      });
    },
  },
};
</script>
<style>
.box-card {
  width: 380px;
  margin: auto;
  margin-top: 200px;
}
</style>
