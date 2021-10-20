<template>
  <el-dialog
    title="分配机构"
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
  </el-dialog>
</template>

<script>
import { getOrganList } from "@/page/api/organApi";
import { updateUnit } from "@/page/api/userApi";
export default {
  data() {
    return {
      visible: false,
      data: [],
      checkKeys: [],
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
      if (e.level === 0) {
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
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      // 如果选中
      if (checked) {
        if (checkedKeys.length === 2) {
          this.$refs.tree.setCheckedKeys([node.id]);
        }
        const params ={
          unitId:node.id,
          userId:this.userInfo.id
        }
        updateUnit(params)
      }
    },
    show(userinfo) {
      this.userInfo = userinfo;
      this.checkKeys = [];
      if (this.userInfo.unitId != null) {
        this.checkKeys.push(this.userInfo.unitId);
      }
      this.visible = true;
    },
    close() {
      this.resetChecked();
      this.$emit('refresh')
      this.visible = false;
    },
  },
};
</script>

<style>
</style>