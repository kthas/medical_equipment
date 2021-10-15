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
      <el-form-item label="器械编号" prop="typeId">
        <el-input v-model="form.typeId"></el-input>
      </el-form-item>
      <el-form-item label="器械名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <div style="margin-top: 20px;">
        <div style="margin-left:32%">
          <el-button type="primary" @click="submit()">确认</el-button>
          <el-button @click="close()">取消</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { createMain } from "@/page/api/machineApi";
export default {
  data() {
    return {
      visible: false,
      form: {
        typeId: '',
        name: '',
      },
      rules: {
        desc: [{ required: true, message: "请填写器械编号" }],
        name: [{ required: true, message: "请填写器械名" }],
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
            createMain(this.form).then(res=>{
                if(res.code===200){
                    console.log(res)
                    this.$notify.success('保存成功')
                    this.close()
                    this.$emit('refresh')
                }
            })
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