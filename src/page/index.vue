<template>
  <el-container style="margin-left: 10%; margin-right: 10%">
    <el-aside width="200px">
      <el-menu
        :default-openeds="[]"
        @select="menuSelect"
        :unique-opened="false"
        router
        ref="menu"
        :default-active="$route.path"
      >
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-s-tools"></i>内容管理</template
          >
          <el-menu-item-group>
            <el-menu-item v-if="userMenu" index="/user"
              ><i class="el-icon-user"></i>用户管理</el-menu-item
            >
            <el-menu-item v-if="organMenu" index="/organ"
              ><i class="el-icon-school"></i>机构管理</el-menu-item
            >
            <el-menu-item v-if="machineMenu" index="/machine"
              ><i class="el-icon-scissors"></i>器械管理</el-menu-item
            >
            <el-menu-item v-if="userGroupMenu" index="/userGroup"
              ><i class="el-icon-s-check"></i>用户组管理</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-document"></i>订单管理</template
          >
          <el-menu-item-group>
            <el-menu-item v-if="userGroupMenu" index="/order"
              ><i class="el-icon-s-claim"></i>订单审核</el-menu-item
            >
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
            <el-dropdown-item command="userUpdate">修改信息</el-dropdown-item>
            <el-dropdown-item command="loginOut">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <UserInfoDialog
        ref="userInfoDialog"
        :userInfoParam="userInfo"
        :visibleParam="userInfoVisible"
      ></UserInfoDialog>
      <UserUpdate
        ref="userUpdateDialog"
        :chooseUserInfo="userInfo"
        :visibleParam="userUpdateVisible"
      ></UserUpdate>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from "./api/userApi";
import { listPermission } from "./api/loginApi";
import user from "@/page/user/user";
import UserInfoDialog from "@/page/user/components/UserInfoDialog";
import UserUpdate from "@/page/user/components/UserUpdate";
export default {
  components: {
    user,
    UserInfoDialog,
    UserUpdate,
  },
  data() {
    return {
      token: this.$route.params.token || localStorage.getItem("token"),
      userInfo: {},
      userInfoVisible: false,
      userUpdateVisible: false,
      contentPath: ["/user", "/machine", "/organ", "/userGroup"],
      orderPath: ["/order"],
      userMenu: false,
      machineMenu: false,
      organMenu: false,
      userGroupMenu: false,
      orderMenu: false,
    };
  },
  created() {
    // 获取用户信息然后进行渲染
    this.getUserInfo();
    listPermission({}).then((res) => {
      localStorage.setItem("listPermission", JSON.stringify(res.data));
    });
  },
  mounted() {
    this.changeMenu();
    const pids = JSON.parse(localStorage.getItem("pids"));
    if (pids.indexOf(100) >= 0) {
      this.userMenu = true;
    }
    if (pids.indexOf(200) >= 0) {
      this.userGroupMenu = true;
    }
    if (pids.indexOf(300) >= 0) {
      this.orderMenu = true;
    }
    if (pids.indexOf(400) >= 0) {
      this.organMenu = true;
    }
    if (pids.indexOf(500) >= 0) {
      this.machineMenu = true;
    }
  },
  methods: {
    // 获取用户基本信息
    getUserInfo() {
      const params = {};
      getUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data;
        }
      });
    },
    // 菜单选择
    menuSelect(index) {
      this.changeMenu();
    },
    handleCommand(command) {
      if (command === "userInfo") {
        this.$refs.userInfoDialog.showUserInfo();
      }
      if (command === "loginOut") {
        this.loginOut();
      }
      if (command === "userUpdate") {
        this.$refs.userUpdateDialog.showUserUpdate();
      }
    },
    // 登出
    loginOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("pids");
      localStorage.removeItem("listPermission");
      this.$router.push({ name: "login", params: {} });
    },
    changeMenu() {
      setTimeout(() => {
        if (this.contentPath.indexOf(this.$route.path) >= 0) {
          this.$refs.menu.open(1);
        }
        if (this.orderPath.indexOf(this.$route.path) >= 0) {
          this.$refs.menu.open(2);
        }
      }, 50);
    },
  },
};
</script>

<style>
.el-header {
  background-color: #dceafa;
  line-height: 56px;
  border-style: solid;
  border-color: #7dbafc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-main {
  padding: 10px;
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