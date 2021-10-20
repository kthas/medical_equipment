<template>
  <el-dialog
    title="审核排序"
    :visible.sync="visible"
    width="43%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="close()"
  >
    <el-row :gutter="24">
      <el-col :span="24">
        <el-transfer
          v-model="value"
          :data="data"
          :titles="['未分配用户', '当前顺序']"
          target-order="push"
        >
        </el-transfer>
        <el-button style="margin-left: 45%" type="primary" @click="submit"
          >确认</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { updateChecker } from "@/page/api/userApi";
export default {
  props: {
    checkList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    checkList: {
      handler(newValue) {
        if (newValue) {
          this.checker = newValue;
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      visible: false,
      data: [],
      value: [],
      groupId: "",
      checker: [],
    };
  },
  methods: {
    show() {
      this.visible = true;
      this.handlerCheckerList();
    },
    close() {
      this.visible = false;
    },
    handlerCheckerList() {
      (this.data = []),
        (this.value = []),
        this.checker.forEach((e) => {
          this.data.push({
            label: e.nickname,
            key: e.checker.userId,
          });
          this.value.push(e.checker.userId);
        });
    },
    submit() {
      if (this.data.length != this.value.length) {
        this.$message.warning("所有用户都需要分配审核顺序");
        return;
      }
      let list = this.value[0];
      for (let i = 1; i < this.value.length; i++) {
        list = list + "," + this.value[i];
      }
      const params = {
        list,
        unitId: this.checker[0].checker.unitId,
      };
      updateChecker(params).then((res) => {
        if (res.code === 200) {
          this.close();
          this.$notify({
            title: "提示",
            message: "请点击顶级机构刷新排序",
          });
        }
      });
    },
  },
};
</script>

<style>
.transfer-footer {
  margin-left: 70%;
  padding: 6px 5px;
}
</style>