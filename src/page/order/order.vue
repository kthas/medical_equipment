<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">订单审核</span></el-col>
      <el-divider></el-divider>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table
          :data="
            orderList.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          style="width: 100%; padding: 20px"
        >
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showPic(scope)"
                >查看图片</el-button
              >
              <el-button v-if="scope.row.order.status == 0" type="text" size="small" @click="showOrder(scope)"
                >审批</el-button
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
          :total="orderList.length"
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
        <el-dialog
          title="订单审批"
          :visible.sync="orderVisible"
          width="30%"
          :showClose="true"
          :close-on-click-modal="false"
          :modal="true"
          @closed="close()"
          ><el-switch
            style="display: block"
            v-model="isOk"
            inactive-color="#13ce66"
            active-color="#ff4949"
            active-text="不通过"
            inactive-text="通过"
            @change="isShowBackReason"
          >
          </el-switch>
          <el-input
            v-if="backVisible"
            type="textarea"
            :rows="2"
            placeholder="请输入不通过原因"
            v-model="backReason"
            style="margin-top: 20px;"
          >
          </el-input>
          <div style="margin-top: 20px;"> 
            <el-button type="primary" @click="submitOrder()">确认</el-button>
            <el-button   @click="close()">取消</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { listAllUnitOrders ,verify,cancelByChecker} from "@/page/api/orderApi";
import { getUserInfo } from "@/page/api/userApi";
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
      orderVisible: false,
      backVisible: false,
      machineList: [],
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      srcList: [],
      isOk: false,
      backReason: "",
      chooseOrder:{},
    };
  },
  methods: {
    getOrderList() {
      const params = {};
      getUserInfo(params).then((res) => {
        this.userId = res.data.id;
        params.userId = this.userId;
        listAllUnitOrders(params).then((res) => {
        if (res.code === 200) {
          this.orderList = res.data;
          this.orderList.forEach((e) => {
            e.order.createTime = formatDate(e.order.createTime);
            e.order.updateTime = formatDate(e.order.updateTime);
          });
        }
      });
      });
    },
    showPic(scope) {
      scope.row.pics.forEach((e) => {
        this.srcList.push(this.GLOBAL.pic_server + e.name);
      });
      this.picVisible = true;
    },
    showOrder(scope) {
      this.chooseOrder =scope.row
      this.orderVisible = true;
    },
    close() {
      this.orderVisible = false;
    },
    // 关闭图片预览
    onClose() {
      this.picVisible = false;
    },
    // 提交订单审核
    submitOrder() {
      const params={
        orderId:this.chooseOrder.order.id
      }
      if(!this.isOk){
        //通过
        verify(params)
      }else{
        if (this.backReason ===''){
          this.$message.warning('请输入不通过原因')
          return
        }
        params.msg=this.backReason
        cancelByChecker(params)
      }
      this.close()
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