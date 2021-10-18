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
  </el-dialog>
</template>

<script>
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
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style>
</style>