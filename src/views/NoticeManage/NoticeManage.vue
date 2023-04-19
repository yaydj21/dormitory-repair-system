<template>
  <div>
    <!-- 头部选项区域 -->
    <div class="header">
      <el-button @click="buttonHandler()" type="primary"> + 新增 </el-button>
    </div>
    <commond-table
      :column="column"
      :tableData="noticeArr"
      :buttonTypeArr="buttonTypeArr"
    ></commond-table>
    <add-dialog
      :dialogVisible.sync="dialogVisible"
      :dialogColumn="dialogColumn"
      :dialogTime="dialogTime"
    ></add-dialog>
  </div>
</template>

<script>
import { getNoticeInfo } from "@/request/api/noticeApi.js";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTime: "",
      // 表格的表头
      column: [
        { label: "标题", prop: "title", type: "text" },
        { label: "内容", prop: "content", type: "text" },
        { label: "时间", prop: "time", type: "text" },
      ],
      dialogColumn: [
        { label: "标题", prop: "title", type: "text" },
        { label: "内容", prop: "content", type: "text" },
      ],
      // 表格的数据
      noticeArr: [],
      // 表格中按钮的类型
      buttonTypeArr: [
        { size: "mini", type: "", text: "编辑", methods: "edit" },
        { size: "mini", type: "danger", text: "删除", methods: "delete" },
      ],
    };
  },
  components: {
    // 引入表格组件
    "commond-table": () => import("@/components/CommonTable.vue"),
    "add-dialog": () => import("@/components/AddDialog.vue"),
  },
  methods: {
    // 获取通知数据方法
    async getNoticeInfo() {
      // 解构赋值data中的data数组
      const {
        data: { data: results },
      } = await getNoticeInfo();
      // 过滤出未删除的数据 0未删除 1已删除
      const filterResults = results.filter((val) => {
        return val.status === "0";
      });
      this.noticeArr = filterResults;
    },
    // 生成时间方法
    newDate() {
      // 创建一个Date对象
      const currentDate = new Date();

      // 获取年、月、日、时、分、秒
      const year = currentDate.getFullYear();
      const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // 月份需要加1，并且补0
      const date = ("0" + currentDate.getDate()).slice(-2); // 补0
      const hours = ("0" + currentDate.getHours()).slice(-2); // 补0
      const minutes = ("0" + currentDate.getMinutes()).slice(-2); // 补0
      const seconds = ("0" + currentDate.getSeconds()).slice(-2); // 补0

      // 拼接成最终的时间字符串
      const currentTime =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;

      return currentTime;
    },
    buttonHandler() {
      this.dialogTime = this.newDate();
      this.dialogVisible = true; // 打开弹窗
    },
  },
  mounted() {
    //调用获取通知数据方法
    this.getNoticeInfo();
  },
};
</script>

<style lang="less" scoped>
</style>