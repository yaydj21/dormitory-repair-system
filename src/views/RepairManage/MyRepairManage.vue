<template>
  <div>
    <!-- 头部选项区域 -->
    <div class="header">
      <el-button @click="buttonHandler()" type="primary"> + 新增 </el-button>
    </div>
    <!-- 表格区域 -->
    <common-table
      :column="column"
      :tableData="tableData"
      :buttonTypeArr="buttonTypeArr"
    ></common-table>
    <add-dialog
      :dialogVisible.sync="dialogVisible"
      :dialogColumn="dialogColumn"
      :dialogOrderId="dialogOrderId"
      :dialogAddress="dialogAddress"
    ></add-dialog>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import AddDialog from "@/components/AddDialog";
import { getMyRepairOrders } from "@/request/api/repairOrderApi.js";
export default {
  name: "myRepairManage",
  data() {
    return {
      dialogVisible: false,
      searchInput: "",
      tableData: [],
      dialogOrderId: "",
      dialogAddress:"",
      column: [
        { label: "工单号", prop: "orderId", type: "text" },
        { label: "报修内容", prop: "content", type: "text" },
        { label: "报修地址", prop: "address", type: "text" },
        { label: "申请账号", prop: "applicant", type: "text" },
        { label: "联系电话", prop: "telNum", type: "text" },
        { label: "邮箱", prop: "email", type: "text" },
        { label: "故障类型", prop: "faultType", type: "text" },
        { label: "故障图片", prop: "faultPicture", type: "image" },
      ],
      dialogColumn: [
        { label: "报修内容", prop: "content", type: "text" },
        { label: "联系电话", prop: "telNum", type: "text" },
        { label: "邮箱", prop: "email", type: "text" },
        { label: "故障类型", prop: "faultType", type: "text" },
        { label: "故障图片", prop: "faultPicture", type: "image" },
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
    async getMyOrderInfo() {
      const userAccount = {
        account: this.$store.state.token.userInfo.account,
      };
      // console.log(userAccount);
      const {
        data: { data: res },
      } = await getMyRepairOrders(userAccount);
      const filterResults = res.filter((val) => {
        return val.deleteStatus === 0;
      });
      this.tableData = filterResults;
    },
    // 生成订单号方法
    newDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");
      const second = String(now.getSeconds()).padStart(2, "0");

      return `${year}${month}${day}${hour}${minute}${second}`;
    },
    buttonHandler() {
      this.dialogOrderId = this.newDate();
      this.dialogAddress = JSON.parse(localStorage.getItem('state')).userInfo.address;
      this.dialogVisible = true; // 打开弹窗
    },
  },
  mounted() {
    this.getMyOrderInfo();
  },
  components: {
    CommonTable,
    AddDialog,
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