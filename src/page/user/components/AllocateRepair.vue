<template>
  <el-dialog
    title="分配维修机构"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="close()"
  >
    <el-tree
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="false"
      :default-checked-keys="checkKeys"
      node-key="id"
      ref="tree"
      show-checkbox
      :check-strictly="true"
      @check-change="check"
    ></el-tree>
    <div class="okandcancel">
      <el-button type="primary" @click="onSubmit">确认</el-button>
      <el-button @click="close()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOrganList } from "@/page/api/organApi";
import { updateUserInfo } from "@/page/api/userApi";
export default {
  data() {
    return {
      visible: false,
      data: [],
      checkKeys: [],
      checkedKeys: [],
      userInfo: {},
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  created() {
    this.getOrganList();
  },
  methods: {
    getOrganList() {
      const params = {};
      getOrganList(params).then((res) => {
        if (res.code === 200) {
          res.data.forEach((e) => {
            this.changeTreeData(e);
          });
          this.data = res.data;
        }
      });
    },
    changeTreeData(e) {
      e.id = e.unit.id;
      e.name = e.unit.name;
      e.desc = e.unit.desc;
      e.parentId = e.unit.parentId;
      e.level = e.unit.level;
      if (e.level != 0) {
        e.disabled = true;
      }
      if (e.children != null && e.children.length > 0) {
        e.children.forEach((element) => {
          this.changeTreeData(element);
        });
      }
    },
    resetChecked() {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    check(node, checked, data) {
      this.checkedKeys = this.$refs.tree.getCheckedKeys();
    },
    show(userinfo) {
      this.userInfo = userinfo;
      this.checkKeys = [];
      if (this.userInfo.fixUnits != null) {
        this.userInfo.fixUnits.forEach((e) => {
          this.checkKeys.push(e);
        });
      }
      this.visible = true;
    },
    onSubmit() {
      let units;
      if (this.checkedKeys.length <= 0) {
        units = "";
      } else {
        units = this.checkedKeys[0];
        isFixer=true
        for (let i = 1; i < this.checkedKeys.length; i++) {
          units += "," + this.checkedKeys[i];
        }
      }
      const params = {
        units: units,
        userId: this.userInfo.id,
      };
      updateUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.$emit("refresh");
          this.visible = false;
        }
      });
    },
    close() {
      this.resetChecked();
      this.$emit("refresh");
      this.visible = false;
    },
  },
};
</script>

<style>
.okandcancel {
  margin-top: 20px;
  margin-left: 120px;
  width: 200px;
}
</style>