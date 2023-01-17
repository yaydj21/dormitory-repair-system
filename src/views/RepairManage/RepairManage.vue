<template>
  <div>
    <!-- 搜索区域 -->
    <div class="search_bar">
      <el-input
        v-model="searchInput"
        placeholder="请输入内容"
        class="search_input"
      ></el-input>
      <el-button icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格区域 -->
    <common-table :column="column" :tableData="tableData"></common-table>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { getRepairOrderInfo } from "@/request/api/repairOrderApi.js";
export default {
  name: "repairManage",
  data() {
    return {
      searchInput: "",
      tableData: [
      ],
      column: [
        { label: "工单号", prop: "orderId" },
        { label: "报修内容", prop: "content" },
        { label: "报修地址", prop: "address" },
        { label: "申请人", prop: "applicant" },
        { label: "联系电话", prop: "telNum" },
        { label: "邮箱", prop: "email" },
        { label: "故障图片", prop: "faultPicture" },
        { label: "处理状态", prop: "status" },
      ],
    };
  },
  methods: {
    handleCheck(index, row) {
      console.log(index, row);
    },
    handleClose(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 获取维修订单信息
    async getOrderInfo(){
      const {data : {data : results}} = await getRepairOrderInfo();
      this.tableData = results;
      console.log(results);
    }
  },
  mounted(){
    this.getOrderInfo();
  },
  components: {
    CommonTable,
  },
};
</script>

<style lang="less" scoped>
.search_bar {
  display: flex;
  .search_input {
    width: 500px;
  }
}
</style>