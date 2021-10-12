<template>
  <el-dialog
    title="用户信息修改"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="closeUserUpdate()"
  >
    <el-row :gutter="20">
      <el-col :span="22">
        <el-form label-width="80px" :model="userInfo">
          <el-form-item label="昵称">
            <el-input type="text" v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="phoneNumber"
            :rules="[{ type: 'number' ,message: '电话必须为数字' }]"
          >
            <el-input v-model.number="userInfo.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="closeUserUpdate()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { updateUserInfo } from "@/page/api/userApi";
export default {
  props: {
    chooseUserInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    chooseUserInfo: {
      handler() {
        this.userInfo = this.chooseUserInfo;
      },
    },
  },
  data() {
    return {
      visible: false,
      userInfo: {},
    };
  },
  methods: {
    showUserUpdate() {
      this.visible = true;
    },
    closeUserUpdate() {
      this.visible = false;
    },
    onSubmit() {
      const params = {
        nickname: this.userInfo.nickname,
        phone: this.userInfo.phoneNumber,
        userId: this.chooseUserInfo.id,
      };
      updateUserInfo(params).then((res) => {
        if(res.code===200){
          this.$notify.success('保存成功')
          this.closeUserUpdate()
        }
      });
    },
  },
};
</script>

<style>
</style>