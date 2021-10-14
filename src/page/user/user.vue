<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">用户管理</span></el-col>
      <el-divider></el-divider>
      <el-button type="primary" plain>新增用户</el-button>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table
          :data="
            userList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
          "
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateUser(scope)"
                >修改</el-button
              >
              <el-button type="text" size="small" @click="addGroup(scope)"
                >添加用户组</el-button
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
          :total="machineList.length"
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
  </div>
</template>

<script>
import UserUpdate from "@/page/user/components/UserUpdate";
import AddUserGroup from "@/page/user/components/AddUserGroup";
import { getUserList } from "@/page/api/userApi";
import { formatDate } from "@/common/js/DateFormatUtil.js";
export default {
  components: {
    UserUpdate,
    AddUserGroup,
  },
  data() {
    return {
      userList: [],
      chooseUserInfo: {},
      groupList: [],
      machineList: [],
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      const params = {};
      getUserList(params).then((res) => {
        this.userList = res.data;
        this.userList.forEach((e) => {
          e.createTime = formatDate(e.createTime);
          e.updateTime = formatDate(e.updateTime);
        });
      });
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