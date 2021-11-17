<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="24"><span class="headerTitle">器械管理</span></el-col>
      <el-divider></el-divider>
      <el-button type="primary" plain @click="addMachineMain()"
        >新增器械大类</el-button
      >
    </el-row>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table
          :data="
            machineList.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          style="width: 100%; padding: 20px"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.subtype"
                style="width: 100%; text-align: center"
              >
                <el-table-column
                  prop="index"
                  label="排序号"
                  align="center"
                  width="80px"
                >
                </el-table-column>
                <el-table-column prop="name" label="器械名"> </el-table-column>
                <el-table-column prop="desc" label="器械介绍">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="deleteSubmachine(scope)"
                      >删除</el-button
                    >
                  </template></el-table-column
                >
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="typeId" label="大类编号"> </el-table-column>
          <el-table-column prop="name" label="器械大类"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addMachineSub(scope)"
                >新增器械</el-button
              >
              <el-button type="text" size="small" @click="deleteMachine(scope)"
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
          :total="machineList.length"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <AddMachineMain ref="addMachineMain" @refresh="refresh"></AddMachineMain>
    <AddMachineSub ref="addMachineSub" @refresh="refresh"></AddMachineSub>
  </div>
</template>

<script>
import { getMachineList, removeMain, removeSub } from "@/page/api/machineApi";
import AddMachineMain from "./components/AddMachineMain.vue";
import AddMachineSub from "./components/AddMachineSub.vue";
export default {
  components: {
    AddMachineMain,
    AddMachineSub,
  },
  data() {
    return {
      machineList: [],
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据,
      chooseMachineId: "",
    };
  },
  created() {
    this.getMachineList();
  },
  methods: {
    getMachineList() {
      const params = {};
      getMachineList(params).then((res) => {
        if (res.code === 200) {
          this.machineList = res.data;
          this.machineList.forEach((e) => {
            e.subtype.forEach((s) => {
              s.machineId = e.id;
            });
          });
        }
      });
    },
    addMachineMain() {
      this.$refs.addMachineMain.show();
    },
    addMachineSub(scope) {
      this.$refs.addMachineSub.show(scope.row.id);
    },
    deleteMachine(scope) {
      this.$confirm("此操作将删除大类及子类器械, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          const params = {
            machineId: scope.row.id,
          };
          removeMain(params).then((res) => {
            if (res.code === 200) {
              this.$notify.success("删除成功");
              this.refresh();
            }
          });
        })
        .catch(() => {});
    },
    deleteSubmachine(scope) {
      this.$confirm("此操作将删除该子类器械, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          const params = {
            machineId: scope.row.machineId,
            index: scope.row.index,
          };
          removeSub(params).then((res) => {
            if (res.code === 200) {
              this.$notify.success("删除成功");
              this.refresh();
            }
          });
        })
        .catch(() => {});
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 刷新表格
    refresh() {
      this.getMachineList();
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