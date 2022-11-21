<template>
    <div>
      <el-row :gutter="5">
        <el-col :span="24"><span class="headerTitle">订单管理</span></el-col>
        <el-divider></el-divider>
        <el-form ref="form" :inline="true" :model="form">
          <el-form-item label="表单状态">
          <el-select v-model="form.status" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="创建完成，待审批" :value=0></el-option>
            <el-option label="审批通过，待维修" :value=1></el-option>
            <el-option label="维修完成，待确认" :value=2></el-option>
            <el-option label="已确认，订单完成" :value=3></el-option>
            <el-option label="用户取消订单" :value=4></el-option>
            <el-option label="审批不通过" :value=5></el-option>
            <el-option label="维修异常" :value=6></el-option>
            <el-option label="订单关闭" :value=10></el-option>
          </el-select>
        </el-form-item>
        </el-form>
      </el-row>
      <el-button type="primary" @click="getOrderList">查询</el-button>
      <el-row :gutter="0">
        <el-col :span="24">
          <el-table
            :data="orderList"
            style="width: 100%;"
          >
            <el-table-column prop="unitName" label="机构名">
            </el-table-column>
            <el-table-column prop="machineName" label="器械大类">
            </el-table-column>
            <el-table-column prop="machineSubName" label="器械">
            </el-table-column>
            <el-table-column prop="nickname" label="订单发起人">
            </el-table-column>
            <el-table-column prop="order.createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="statusText" label="订单状态">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showPic(scope)"
                  >查看图片</el-button
                >
            <el-popconfirm
               title="确认关闭订单吗?"
               @confirm="closeOrderButton(scope)"
            >
            <el-button  type="text" size="small" slot="reference">关闭</el-button>
            </el-popconfirm>
              </template>
              </el-table-column
            >
          </el-table>
          <el-pagination
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
          <!-- 这里用 v-if 和 v-show 的区别是 v-if 每次都会重置默认第一张预览图，由 initialIndex 属性指定，而 v-show 会缓存上次切换的那张图 -->
          <el-image-viewer
            v-if="picVisible"
            :initial-index="1"
            :on-close="onClose"
            :on-switch="onSwitch"
            :url-list="srcList"
          />
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import ElImageViewer from "element-ui/packages/image/src/image-viewer";
  import { list, closeOrder } from "@/page/api/orderApi";
  import { formatDate } from "@/common/js/DateFormatUtil.js";
  export default {
    components: {
      ElImageViewer,
    },
    created() {
      this.getOrderList();
    },
    data() {
      return {
        userId: "",
        orderList: [],
        picVisible: false,
        backVisible: false,
        machineList: [],
        currentPage: 1, //初始页
        pageSize: 5, //    每页的数据
        srcList: [],
        isOk: false,
        chooseOrder:{},
        total:0,
        form: {
        status: "",
      },
      };
    },
    methods: {
      getOrderList() {
        const params = {};
        params.pageSize=this.pageSize;
        params.pageId = this.currentPage-1;
        params.status = this.form.status !== ''? this.form.status : '';
          list(params).then((res) => {
          if (res.code === 200) {
            this.orderList = res.data.list;
            this.total = res.data.total;
            this.orderList.forEach((e) => {
              e.order.createTime = formatDate(e.order.createTime);
              e.order.updateTime = formatDate(e.order.updateTime);
            });
          }
        });
      },
      showPic(scope) {
        scope.row.pics.forEach((e) => {
          this.srcList.push(this.GLOBAL.pic_server + e.name);
        });
        this.picVisible = true;
      },
      closeOrderButton(scope) {
        this.chooseOrder =scope.row.order;
        const params = {orderId: this.chooseOrder.id};
        this.getOrderList();
      
        closeOrder(params).then(res =>{
          if( res ===200){
            this.$message({
            message: '关闭成功',
            type: 'success'
          });
          }
        });
      },
      // 关闭图片预览
      onClose() {
        this.picVisible = false;
      },
      isShowBackReason() {
        if (this.isOk) {
          this.backVisible = true;
        } else {
          this.backVisible = false;
        }
      },
      // 切换图片 index为图片下标值
      onSwitch(index) {},
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange(size) {
        this.pageSize = size;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getOrderList();
      },
    },
  };
  </script>
  
  <style>
  </style>