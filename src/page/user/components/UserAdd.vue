<template>
  <el-dialog
    title="新增用户"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="closeUserAdd()"
  >
    <el-row :gutter="20">
      <el-col :span="22">
        <el-form label-width="80px" ref="form" :model="userInfo" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input type="text" v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model.number="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="closeUserAdd()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addNewUser } from "@/page/api/userApi";
export default {
  data() {
    return {
      visible: false,
      userInfo: {
        username: "",
        nickname: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        nickname: [{ required: true, message: "请输入昵称" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    showUserAdd() {
      this.visible = true;
    },
    closeUserAdd() {
      this.visible = false;
    },
    onSubmit() {
      const params = {
        username: this.userInfo.username,
        nickname: this.userInfo.nickname,
        password: this.userInfo.password,
      };
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addNewUser(params).then((res) => {
            if (res.code === 200) {
              this.$notify.success("保存成功");
              this.closeUserAdd();
            }
          });
        }
      });
    },
  },
};
</script>

<style>
</style>