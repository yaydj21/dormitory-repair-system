<template>
  <div class="container">
    <!-- 表格区域 -->
    <common-table
      :column="column"
      :tableData="tableData"
      :buttonTypeArr="buttonTypeArr"
    ></common-table>
    <!-- 分页区域 -->
    <!-- <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      class="pagination"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import CommonTable from "@/components/CommonTable";
import { getMaintainerInfo } from "@/request/api/maintainerApi.js";
export default {
  name: "MaintainerManage",
  data() {
    return {
      idInput: "",
      tableData: [],
      column: [
        { label: "工号", prop: "account", type: "text" },
        { label: "密码", prop: "password", type: "text" },
        { label: "姓名", prop: "name", type: "text" },
        { label: "电话", prop: "telNum", type: "text" },
        { label: "部门", prop: "department", type: "text" },
        { label: "性别", prop: "sex", type: "text" },
        { label: "是否启用", prop: "enable", type: "text" },
      ],
      // 表格中按钮的类型
      buttonTypeArr: [
        { size: "mini", type: "", text: "编辑", methods: "edit" },
        { size: "mini", type: "danger", text: "删除", methods: "delete" },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    async getMaintainerInfo() {
      const {
        data: { data: results },
      } = await getMaintainerInfo();
      // 过滤出未删除的数据 0未删除 1已删除
      const filterResults = results.filter((val) => {
        return val.status === "0";
      });
      this.tableData = filterResults;
    },
  },
  components: {
    CommonTable,
  },
  mounted() {
    this.getMaintainerInfo();
  },
};
</script>

<style lang="less" scoped>
.id-input {
  width: 250px;
}
.search-btn {
  margin-left: 20px;
}
.col-right {
  display: flex;
  justify-content: flex-end;
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>