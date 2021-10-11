<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">用户管理</span></el-col>
      <el-divider></el-divider>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%; padding: 20px">
          <el-table-column prop="username" label="用户名" width="100px">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" width="100px">
          </el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template></el-table-column
          >
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserList } from "@/page/api/userApi";
export default {
  data() {
    return {
      userList: [],
      tableData: [
        {
          username: "laoxie",
          nickname: "常州人",
          phone: "18118367876",
          createTime: "2021-08-31T10:14:47",
          updateTime: "2021-09-28T03:48:52",
        },
      ],
    };
  },
  created() {
    // this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      const params = {};
      getUserList(params).then((res) => {
        console.log(res);
      });
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
  margin: 33px 0 0 0;
}
</style>