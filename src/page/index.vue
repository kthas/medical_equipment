<template>
  <el-container style="margin-left: 10%; margin-right: 10%">
    <el-aside width="200px">
      <el-menu
        :default-openeds="[]"
        @select="menuSelect"
        :unique-opened="true"
        router
        :default-active="$route.path"
      >
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="/user">用户</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">{{ userInfo.nickname }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">用户信息</el-dropdown-item>
            <el-dropdown-item command="loginOut">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-dialog
        title="用户信息"
        :visible.sync="dialogVisible"
        width="30%"
        :showClose="true"
      >
        <el-descriptions>
          <el-descriptions-item label="用户名">{{
            userInfo.username
          }}</el-descriptions-item>
          <el-descriptions-item label="昵称">{{
            userInfo.nickname
          }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{
            userInfo.phoneNumber
          }}</el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from "./api/userApi";
import user from "@/page/user/user";
export default {
  components: {
    user,
  },
  data() {
    return {
      token: this.$route.params.token || localStorage.getItem("token"),
      userInfo: {},
      dialogVisible: false,
    };
  },
  created() {
    // 获取用户信息然后进行渲染
    this.getUserInfo();
  },
  methods: {
    // 获取用户基本信息
    getUserInfo() {
      const params = {
        token: this.token,
      };
      getUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data;
        }
      });
    },
    // 菜单选择
    menuSelect(index) {},
    handleCommand(command) {
      if (command === "userInfo") {
        this.showUserInfo()
      }
      if(command === 'loginOut'){
        this.loginOut()
      }
    },
    // 展示个人信息
    showUserInfo() {
      this.dialogVisible = true;
    },
    // 登出
    loginOut() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login', params: {}})
    }
  },
};
</script>

<style>
.el-header {
  background-color: #b3d8ff;
  line-height: 60px;
}
.el-aside {
  color: rgb(214, 210, 210);
}
.el-dropdown-link {
  cursor: pointer;
  color: #303133;
}
.el-dropdown {
  font-size: 18px;
  font-family: Microsoft YaHei;
}
</style>