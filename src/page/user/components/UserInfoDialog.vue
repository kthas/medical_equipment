<template>
  <el-dialog
    title="用户信息"
    :visible.sync="dialogVisible"
    width="30%"
    :showClose="true"
  >
    <el-descriptions>
      <el-descriptions-item label="用户名">{{
        userInfo.username
      }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{
        userInfo.nickname
      }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{
        userInfo.phoneNumber
      }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  props: {
    userInfoParam: {
      type: Object,
      default: {},
    },
    visibleParam: {
      type: Boolean,
      default: false,
    },
  },
  watch:{
      userInfoParam:{
          handler(){
              this.userInfo = this.userInfoParam
          }
      }
  },
  data() {
    return {
      userInfo: this.userInfoParam,
      dialogVisible: this.visibleParam,
    };
  },
  methods: {
    // 展示个人信息
    showUserInfo() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
</style>