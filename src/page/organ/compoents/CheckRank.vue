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
          :titles="['机构所有用户', '当前审核顺序']"
          target-order="push"
          @right-check-change="checkValue"
        >
          <el-button
            style="display: none"
            slot="left-footer"
            size="small"
          ></el-button>
          <el-button
            class="transfer-footer"
            slot="right-footer"
            size="small"
            @click="move('up')"
            >上移</el-button
          >
          <el-button
            class="transfer-footer"
            slot="right-footer"
            size="small"
            @click="move('down')"
            >下移</el-button
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
import { listUser } from "@/page/api/organApi";
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
      unitId: "",
      allUser: [],
      rightCheckList: [],
    };
  },
  methods: {
    show(unitId) {
      this.visible = true;
      this.unitId = unitId;
      this.handlerCheckerList();
    },
    close() {
      this.visible = false;
    },
    handlerCheckerList() {
      const params = {
        unitId: this.unitId,
      };
      listUser(params).then((res) => {
        if (res.code === 200) {
          this.allUser = res.data;
          this.data = [];
          this.value = [];
          this.allUser.forEach((e) => {
            this.data.push({
              label: e.nickname,
              key: e.id,
            });
          });
          this.checker.forEach((e) => {
            this.value.push(e.checker.userId);
          });
        }
      });
    },
    checkValue(rightCheckList) {
      this.rightCheckList = rightCheckList;
    },
    move(direction) {
      if (direction === "up") {
        if (this.rightCheckList.length != 1) {
          this.$message.warning("请仅选择一个审核员进行操作");
        } else {
          const sourceIndex = this.value.indexOf(this.rightCheckList[0]);
          const targetIndex = sourceIndex - 1;
          if (sourceIndex === 0) {
            return;
          } else {
            this.value[sourceIndex] = this.value.splice(
              targetIndex,
              1,
              this.value[sourceIndex]
            )[0];
          }
        }
      }
      if (direction === "down") {
        if (this.rightCheckList.length != 1) {
          this.$message.warning("请仅选择一个审核员进行操作");
        } else {
          const sourceIndex = this.value.indexOf(this.rightCheckList[0]);
          const targetIndex = sourceIndex + 1;
          if (sourceIndex === this.value.length-1) {
            return;
          } else {
            this.value[sourceIndex] = this.value.splice(
              targetIndex,
              1,
              this.value[sourceIndex]
            )[0];
          }
        }
      }
    },
    submit() {
      let list = this.value[0];
      for (let i = 1; i < this.value.length; i++) {
        list = list + "," + this.value[i];
      }
      const params = {
        list,
        unitId: this.unitId,
      };
      updateChecker(params).then((res) => {
        if (res.code === 200) {
          this.close();
          this.$emit('resetCheckerList')
          this.$notify({
            title: "提示",
            message: "未刷新请点击顶级机构刷新排序",
          });
        }
      });
    },
  },
};
</script>

<style>
.transfer-footer {
  margin-left: 30%;
  padding: 6px 5px;
}
</style>