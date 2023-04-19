<template>
  <div>
    <!-- 搜索区域 -->
    <div class="search_bar">
      <el-input
        v-model="searchInput"
        placeholder="请输入工单号进行搜索"
        class="search_input"
      ></el-input>
      <el-button
        icon="el-icon-search"
        @click="searchRepairIdOrderInfo(searchInput)"
        >搜索</el-button
      >
      <el-button icon="el-icon-search" @click="resetTable()">重置</el-button>
    </div>
    <!-- 表格区域 -->
    <common-table
      :column="column"
      :tableData="tableData"
      :buttonTypeArr="buttonTypeArr"
    ></common-table>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import {
  getRepairOrderInfo,
  getRepairIdOrderInfo,
} from "@/request/api/repairOrderApi.js";
export default {
  name: "repairManage",
  data() {
    return {
      searchInput: "",
      tableData: [],
      column: [
        { label: "工单号", prop: "orderId", type: "text" },
        { label: "报修内容", prop: "content", type: "text" },
        { label: "报修地址", prop: "address", type: "text" },
        { label: "申请账号", prop: "applicant", type: "text" },
        { label: "联系电话", prop: "telNum", type: "text" },
        { label: "邮箱", prop: "email", type: "text" },
        { label: "故障类型", prop: "faultType", type: "text" },
        { label: "故障图片", prop: "faultPicture", type: "image" },
        { label: "处理状态", prop: "status", type: "text" },
      ],
      // 表格中按钮的类型
      buttonTypeArr: [
        { size: "mini", type: "", text: "编辑", methods: "edit" },
        { size: "mini", type: "danger", text: "删除", methods: "delete" },
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
    async getOrderInfo() {
      const {
        data: { data: results },
      } = await getRepairOrderInfo();
      // 过滤出未删除的数据 0未删除 1已删除
      const filterResults = results.filter((val) => {
        return val.deleteStatus === 0;
      });
      this.tableData = filterResults;
    },
    // 搜索维修订单
    async searchRepairIdOrderInfo(orderId) {
      const {
        data: { data: res },
      } = await getRepairIdOrderInfo({ orderId: orderId });
      this.tableData = res;
    },
    resetTable() {
      this.getOrderInfo();
    },
  },
  mounted() {
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
    margin-right: 10px;
  }
}
</style>