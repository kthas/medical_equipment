<template>
  <el-dialog
    title="添加器械大类"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="close()"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="序号" prop="index">
        <el-input v-model.number="form.index"></el-input>
      </el-form-item>
      <el-form-item label="器械名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="器械介绍" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <div style="margin-top: 20px">
        <div style="margin-left:32%">
          <el-button type="primary" @click="submit()">确认</el-button>
          <el-button @click="close()">取消</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { createSub } from "@/page/api/machineApi";
export default {
  data() {
    return {
      visible: false,
      form: {
        machineId: '',
        desc: '',
        name: '',
        index: '',
      },
      rules: {
        name: [{ required: true, message: "请填写器械名" }],
        index: [
          { required: true, message: "请填写序号" },
          { type: "number", message: "序号必须为数字" },
        ],
      },
    };
  },
  methods: {
    show(machineId) {
      this.form.machineId = machineId;
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          createSub(this.form).then((res) => {
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