<template>
  <el-dialog
    title="添加机构"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="close()"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="机构名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="父机构" prop="parentName">
        <el-input v-model="form.parentName" disabled></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <div style="margin-top: 20px">
        <div style="margin-left: 32%">
          <el-button type="primary" @click="submit()">确认</el-button>
          <el-button @click="close()">取消</el-button>
        </div>
      </div>
    </el-form></el-dialog
  >
</template>

<script>
import { create } from "@/page/api/organApi";
export default {
  props: {
    chooseOrgan: {
      typeof: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      visible: false,
      form: {
        name: "",
        desc: "",
        parentName: "",
      },
      rules: {
        name: [{ required: true, message: "请填写机构名" }],
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
      if (this.chooseOrgan.id === "0") {
           this.form.parentName='机构树'
      } else {
        this.form.parentName = this.chooseOrgan.name;
        this.form.parentId = this.chooseOrgan.id
      }
    },
    close() {
      this.visible = false;
    },
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          create(this.form).then((res) => {
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