<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">订单审核</span></el-col>
      <el-divider></el-divider>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table :data="userList" style="width: 100%; padding: 20px">
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
              <el-button type="text" size="small"
                >修改</el-button
              >
            </template></el-table-column
          >
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listAllUserOrders } from '@/page/api/orderApi'
import { getUserInfo } from '@/page/api/userApi'
export default {
    created(){
        this.getOrderList()
        
    },
    data:{
        userId:''
    },
    methods:{
        getOrderList(){
            const params ={

            }
            getUserInfo(params).then(res =>{
                this.userId = res.data.id
                params.userId=this.userId
            })
            listAllUserOrders(params).then(res =>{
                console.log(res)
            })
        }
    }
};
</script>

<style>
</style>