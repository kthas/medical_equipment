<template>
  <el-dialog
    title="修改用户组"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="close()"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="组名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <div style="margin-top: 20px">
        <div style="margin-left: 32%">
          <el-button type="primary" @click="submit()">确认</el-button>
          <el-button @click="close()">取消</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateGroup } from "@/page/api/userApi";
export default {
  props: {
    chooseUserGroup: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      visible: false,
      form: {
        name:  '',
        desc: '',
      },
      rules: {
        name: [{ required: true, message: "请输入组名" }],
      },
    };
  },
  watch:{
      chooseUserGroup:{
          handler(newValue){
              if(newValue){
                  this.form.groupId=newValue.id
                  this.form.name=newValue.name
                  this.form.desc=newValue.desc
              }
          },
          immediate: true
      }
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateGroup(this.form).then((res) => {
            if (res.code === 200) {
              this.$notify.success("保存成功");
              this.close();
              this.$emit("refresh");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>