<template>
  <el-dialog
    title="用户信息修改"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
  >
  </el-dialog>
</template>

<script>
export default {
  props: {
    visibleParam: {
      type: Boolean,
      default: false,
    },
  },
  data (){
      return {
          visible:this.visibleParam
      }
  },
  methods:{
      showUserUpdate(){
          this.visible = true
      }
  }
};
</script>

<style>
</style>