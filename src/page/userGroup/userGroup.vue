<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">用户组管理</span></el-col>
      <el-divider></el-divider>
      <el-button type="primary" plain @click="addUserGroup"
        >新增用户组</el-button
      >
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table
          :data="
            userGroupList.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          style="width: 100%; padding: 20px"
        >
          <el-table-column prop="name" label="用户组"> </el-table-column>
          <el-table-column prop="desc" label="描述"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="updateUserGroup(scope)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="updatePermission(scope)"
                >修改权限</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteUserGroup(scope)"
                >删除</el-button
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
          :total="userGroupList.length"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <AddUserGroup ref="addUserGroup" @refresh="refresh"></AddUserGroup>
    <UpdatePermission
      ref="updatePermission"
      :chooseUserGroup="chooseUserGroup"
      @refresh="refresh"
    ></UpdatePermission>
    <UpdateUserGroup
      ref="updateUserGroup"
      :chooseUserGroup="chooseUserGroup"
      @refresh="refresh"
    ></UpdateUserGroup>
  </div>
</template>

<script>
import { getGroupList, removeGroup } from "@/page/api/userApi";
import AddUserGroup from "./components/AddUserGroup";
import UpdateUserGroup from "./components/UpdateUserGroup";
import UpdatePermission from "./components/UpdatePermission";
export default {
  components: {
    AddUserGroup,
    UpdateUserGroup,
    UpdatePermission,
  },
  data() {
    return {
      userGroupList: [],
      chooseUserGroup: {},
      currentPage: 1, //初始页
      pagesize: 5, //每页的数据
    };
  },
  created() {
    this.getGroupList();
  },
  methods: {
    getGroupList() {
      const params = {};
      getGroupList(params).then((res) => {
        if (res.code === 200) {
          this.userGroupList = res.data;
        }
      });
    },
    addUserGroup() {
      this.$refs.addUserGroup.show();
    },
    updateUserGroup(scope) {
      this.$refs.updateUserGroup.show();
      this.chooseUserGroup = scope.row;
    },
    updatePermission(scope) {
      this.$refs.updatePermission.show();
      this.chooseUserGroup = scope.row;
    },
    deleteUserGroup(scope) {
      const params = {
        groupId: scope.row.id,
      };
      removeGroup(params).then((res) => {
        if (res.code === 200) {
          this.$notify.success("删除成功");
          this.refresh();
        }
      });
    },
    refresh() {
      this.getGroupList();
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style>
</style>