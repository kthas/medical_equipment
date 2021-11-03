<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">机构管理</span></el-col>
      <el-divider></el-divider>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="6">
        <el-tree
          :data="data"
          :props="defaultProps"
          :expand-on-click-node="false"
          node-key="id"
          show-checkbox
          :check-strictly="true"
          :default-expanded-keys="['0']"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        ></el-tree>
      </el-col>
      <el-col :span="18"
        ><el-card class="box">
          <el-button type="primary" plain @click="addOrgan">新增机构</el-button>
          <el-button type="warning" plain @click="updateOrgan"
            >修改机构</el-button
          >
          <el-button type="danger" plain @click="deleteOrgan"
            >删除机构</el-button
          >
          <el-button v-if="checkBtn" type="success" plain @click="checkRank"
            >审核员排序</el-button
          >
          <el-button v-if="checkBtn" type="info" plain @click="checkRank"
            >维修员分配</el-button
          >
          <el-descriptions :title="'机构名:' + name" style="margin-top: 20px">
            <el-descriptions-item label="机构介绍">{{
              desc
            }}</el-descriptions-item>
          </el-descriptions>
          <span><b>机构审核员(仅顶级机构展示):</b></span>
          <el-table :data="userList">
            <el-table-column prop="nickname" label="用户名"> </el-table-column>
            <el-table-column prop="unitName" label="所属机构">
            </el-table-column>
            <el-table-column prop="checker.rank" label="审核顺序">
            </el-table-column>
          </el-table> </el-card
      ></el-col>
    </el-row>
    <AddOrgan
      ref="addOrgan"
      @refresh="refresh"
      :chooseOrgan="chooseOrgan"
    ></AddOrgan>
    <UpdateOrgan
      ref="updateOrgan"
      @refresh="refresh"
      :chooseOrgan="chooseOrgan"
    ></UpdateOrgan>
    <CheckRank
      ref="checkRank"
      :checkList="userList"
      @refresh="routeReset"
      @resetCheckerList="resetCheckerList"
    ></CheckRank>
  </div>
</template>

<script>
import { getOrganList, remove, listChecker } from "@/page/api/organApi";
import AddOrgan from "./compoents/AddOrgan";
import UpdateOrgan from "./compoents/UpdateOrgan";
import CheckRank from "./compoents/CheckRank";
export default {
  components: {
    AddOrgan,
    UpdateOrgan,
    CheckRank,
  },
  created() {
    this.getOrganList();
  },
  data() {
    return {
      organList: [],
      checkList: [],
      unitId: "",
      chooseOrgan: {},
      userList: [],
      desc: "",
      name: "",
      checkBtn: false,
      data: [
        {
          name: "机构树",
          id: "0",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    getOrganList() {
      const params = {};
      getOrganList(params).then((res) => {
        if (res.code === 200) {
          res.data.forEach((e) => {
            this.changeTreeData(e);
          });
          this.data[0].children = res.data;
        }
      });
    },
    changeTreeData(e) {
      e.id = e.unit.id;
      e.name = e.unit.name;
      e.desc = e.unit.desc;
      e.parentId = e.unit.parentId;
      e.level = e.unit.level;
      if (e.children != null && e.children.length > 0) {
        e.children.forEach((element) => {
          this.changeTreeData(element);
        });
      }
    },
    addOrgan() {
      if (this.verfyCheckList()) {
        this.$refs.addOrgan.show();
      }
    },
    updateOrgan() {
      if (this.chooseOrgan.id === "0") {
        this.$message.warning("不可修改根节点");
        return;
      }
      if (this.verfyCheckList()) {
        this.$refs.updateOrgan.show();
      }
    },
    deleteOrgan() {
      const params = {
        unitId: this.chooseOrgan.id,
      };
      if (this.verfyCheckList()) {
        remove(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.refresh();
          }
        });
      }
    },
    checkRank() {
      if (this.chooseOrgan.level != 0) {
        this.$message.warning("请选择根节点");
        return;
      }
      if (this.verfyCheckList()) {
        this.$refs.checkRank.show(this.chooseOrgan.id);
      }
    },
    refresh() {
      this.getOrganList();
    },
    handleCheckChange(data, checked) {
      if (checked) {
        this.checkList.push(data);
        if (data.level != 0) {
          this.checkBtn = false;
        } else {
          this.handleNodeClick(data);
          this.checkBtn = true;
        }
      } else {
        this.checkList.splice(this.checkList.indexOf(data), 1);
        if (data.level === 0) {
          this.desc = "";
          this.name = "";
          this.userList = [];
          this.checkBtn = false;
        }
      }
      this.chooseOrgan = this.checkList[0];
    },
    handleNodeClick(data) {
      this.desc = data.desc;
      this.name = data.name;
      this.unitId = data.id;
      const params = {
        unitId: data.id,
      };
      if (data.level === 0) {
        listChecker(params).then((res) => {
          if (res.code === 200) {
            this.userList = res.data;
          }
        });
      } else {
        this.checkBtn = false;
        this.userList = [];
      }
    },
    resetCheckerList() {
      const params = {
        unitId: this.unitId,
      };
      listChecker(params).then((res) => {
        if (res.code === 200) {
          this.userList = res.data;
        }
      });
    },
    routeReset() {
      this.$router.replace;
    },
    // 校验选择列表
    verfyCheckList() {
      if (this.checkList.length > 1) {
        this.$message.warning("仅可选择一个机构进行操作");
        return false;
      }
      if (this.checkList.length === 0) {
        this.$message.warning("请选择一个机构进行操作");
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  margin: auto;
  margin-top: 0px;
}
.headerTitle {
  font-size: 18px;
  margin-bottom: 5px;
}
.el-divider--horizontal {
  display: block;
  height: 2px;
  width: 100%;
  margin: 33px 0 20px 0;
}
</style>