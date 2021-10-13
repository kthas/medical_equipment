<template>
  <el-dialog
    title="用户组添加"
    :visible.sync="visible"
    width="30%"
    :showClose="true"
    :close-on-click-modal="false"
    :modal="true"
    @closed="close()"
  >
    <el-row :gutter="24">
      <el-checkbox-group v-model="checkList">
        <el-col :span="6" v-for="(item, i) in allGroup" :key="i">
          <el-checkbox :label="item.id" :checked="item.isChecked" @change="check(item.id,$event)">{{
            item.name
          }}</el-checkbox>
        </el-col>
      </el-checkbox-group>
    </el-row>
  </el-dialog>
</template>

<script>
import { getUserGroupList,addToGroup ,removeFromGroup} from "@/page/api/userApi";
export default {
  props: {
    chooseUserInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    groupList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    chooseUserInfo: {
      handler() {
        this.userInfo = this.chooseUserInfo;
        this.userInfo.groups.forEach((e) => {
          for (let i = 0; i < this.allGroup.length; i++) {
            if (e === this.allGroup[i].id) {
              this.allGroup[i].isChecked = true;
            }
          }
        });
      },
      groupList: {
        handler() {
          this.group = this.groupList;
        },
      },
    },
  },
  created() {
    this.getAllUserGroup();
  },
  data() {
    return {
      visible: false,
      userInfo: {},
      group: [],
      checkList: [],
      allGroup: [],
      groupIds: [],
      paramsList:[]
    };
  },
  methods: {
    check(groupId,e){
      const params ={
        userId:this.userInfo.id,
        groupId
      }
      if(e){
        addToGroup(params)
      }else{
        removeFromGroup(params)
      }
    },
    show() {
      
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    getAllUserGroup() {
      const parmas = {};
      getUserGroupList(parmas).then((res) => {
        if (res.code === 200) {
          this.allGroup = res.data;
        }
      });
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
</style>