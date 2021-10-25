<template>
  <el-dialog
    title="修改权限"
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
          :titles="['所有权限', '已有权限']"
          @change="handlerChange"
          :render-content="renderFunc"
        ></el-transfer>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, removePermission } from "@/page/api/userApi";
export default {
  props: {
    chooseUserGroup: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    chooseUserGroup: {
      handler(newValue) {
        if (newValue) {
          this.groupId = newValue.id;
          if (newValue.pids != null) {
            this.value = newValue.pids;
          }
        }
      },
      immediate: true,
    },
  },
  created() {
    this.handlerPermission();
  },
  data() {
    return {
      visible: false,
      data: [],
      value: [],
      groupId: "",
      listPermission: [],
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    handlerPermission() {
      const listPermission = JSON.parse(localStorage.getItem("listPermission"));
      const bigPermission = [100, 200, 300, 400, 500];
      listPermission.forEach((element) => {
        if (bigPermission.indexOf(element.pid) < 0) {
          this.data.push({
            key: element.pid,
            label: element.name,
          });
        }
      });
    },
    renderFunc(h, option) {
      var _this = this;
      const listPermission = JSON.parse(localStorage.getItem("listPermission"));
      return h("span", {
        attrs: {
          id: option.key,
        },
        domProps: {
          innerHTML: option.label,
        },
        on: {
          mouseenter: () => {
            listPermission.forEach((e) => {
              if (e.pid === option.key) {
                _this.$notify({
                  title: option.label,
                  message: e.desc,
                });
              }
            });
          },
          //鼠标离开
          mouseleave: () => {
            this.$notify.closeAll()
          },
        },
      });
    },
    handlerChange(currentData, force, data) {
      const params = {
        groupId: this.groupId,
      };
      if (force === "left") {
        data.forEach((e) => {
          params.pid = e;
          removePermission(params);
        });
      } else if (force === "right") {
        data.forEach((e) => {
          params.pid = e;
          addPermission(params);
        });
      }
    },
  },
};
</script>

<style>
</style>