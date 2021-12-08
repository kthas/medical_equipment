<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">用户管理</span></el-col>
      <el-divider></el-divider>
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" size="small"></el-input>
        </el-form-item>
        <el-form-item label="是否维修员">
          <el-select v-model="form.fixer" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否微信用户">
          <el-select v-model="form.wxUser" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="queryUser">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button type="primary" plain @click="addUser">新增用户</el-button>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table
          :data="
            userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
          "
          v-loading="loading"
          style="width: 100%; padding: 20px"
        >
          <el-table-column prop="username" label="用户名" width="100px">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" width="100px">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateUser(scope)"
                >修改</el-button
              >
              <el-button type="text" size="small" @click="addGroup(scope)"
                >分配用户组</el-button
              >
              <el-button type="text" size="small" @click="allocateOrgan(scope)"
                >分配所属机构</el-button
              >
              <el-button type="text" size="small" @click="allocateRepair(scope)"
                >分配维修机构</el-button
              >
            </template></el-table-column
          >
        </el-table>
        <el-pagination
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="userList.length"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <UserUpdate
      ref="userUpdateDialog"
      :chooseUserInfo="chooseUserInfo"
    ></UserUpdate>
    <AddUserGroup
      ref="addUserGroupDialog"
      :chooseUserInfo="chooseUserInfo"
      :groupList="groupList"
    ></AddUserGroup>

    <UserAdd ref="userAddDialog" @refresh="refresh"></UserAdd>
    <AllocateOrgan ref="allocateOrgan" @refresh="refresh"></AllocateOrgan>
    <AllocateRepair ref="allocateRepair" @refresh="refresh"></AllocateRepair>
  </div>
</template>

<script>
import UserUpdate from "@/page/user/components/UserUpdate";
import AddUserGroup from "@/page/user/components/AddUserGroup";
import AllocateOrgan from "@/page/user/components/AllocateOrgan";
import AllocateRepair from "@/page/user/components/AllocateRepair";
import UserAdd from "@/page/user/components/UserAdd";
import { getUserList, updateUnit } from "@/page/api/userApi";
import { formatDate } from "@/common/js/DateFormatUtil.js";
export default {
  components: {
    UserUpdate,
    AddUserGroup,
    UserAdd,
    AllocateOrgan,
    AllocateRepair,
  },
  data() {
    return {
      userList: [],
      chooseUserInfo: {},
      groupList: [],
      machineList: [],
      loading: false,
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      form: {
        nickname: "",
        fixer: "",
        wxUser: "",
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.loading = true;
      const params = {
      };
      if (this.form.nickname!='') {
        params.nickname = this.form.nickname;
      }
      if (this.form.fixer ===true||this.form.fixer ===false) {
        params.fixer = this.form.fixer;
      }
      if (this.form.wxUser ===true||this.form.wxUser ===false) {
        params.wxUser = this.form.wxUser;
      }
      getUserList(params).then((res) => {
        this.userList = res.data;
        this.userList.forEach((e) => {
          e.createTime = formatDate(e.createTime);
          e.updateTime = formatDate(e.updateTime);
        });
        this.loading = false;
      });
    },
    queryUser() {
      this.getUserList();
    },
    addUser() {
      this.$refs.userAddDialog.showUserAdd();
    },
    // 更新用户
    updateUser(scope) {
      this.$refs.userUpdateDialog.showUserUpdate();
      this.chooseUserInfo = scope.row;
    },
    // 添加用户组
    addGroup(scope) {
      this.chooseUserInfo = scope.row;
      this.$refs.addUserGroupDialog.show();
    },
    allocateOrgan(scope) {
      this.$refs.allocateOrgan.show(scope.row);
    },
    allocateRepair(scope) {
      this.$refs.allocateRepair.show(scope.row);
    },
    refresh() {
      this.getUserList();
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    resetQuery() {
      this.form.nickname = "";
      this.form.fixer = "";
      this.form.wxUser = "";
    },
  },
};
</script>

<style>
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