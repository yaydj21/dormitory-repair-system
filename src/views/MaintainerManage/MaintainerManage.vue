<template>
  <div class="container">
    <!-- 头部选项区域 -->
    <div class="header">
      <el-row>
        <el-col :span="16">
          <!-- 学号搜索 -->
          <el-input
            v-model="idInput"
            placeholder="以学号搜索健康打卡记录"
            class="id-input"
          ></el-input>
          <!-- 咳嗽搜索 -->
          <el-select v-model="selectData.coughData" placeholder="咳嗽">
            <el-option
              v-for="item in coughOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- 发烧搜索 -->
          <el-select v-model="selectData.feverData" placeholder="发烧">
            <el-option
              v-for="item in feverOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- 体温搜索 -->
          <!-- 发烧搜索 -->
          <el-select v-model="selectData.temperatureData" placeholder="体温">
            <el-option
              v-for="item in temperatureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- 搜索按钮 -->
          <el-button type="primary" icon="el-icon-search" class="search-btn"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="8" class="col-right">
          <!-- 添加按钮 -->
          <el-button type="primary" icon="el-icon-circle-plus-outline"
            >添加</el-button
          >
          <!-- 导出Excel按钮 -->
          <el-button type="primary" icon="el-icon-document"
            >导出Excel</el-button
          ></el-col
        >
      </el-row>
    </div>
    <!-- 表格区域 -->
    <common-table
      :column="column"
      :tableData="tableData"
      :buttonTypeArr="buttonTypeArr"
    ></common-table>
    <!-- 分页区域 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      class="pagination"
    >
    </el-pagination>
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
      coughOptions: [
        { value: "1", label: "有咳嗽" },
        { value: "0", label: "无咳嗽" },
      ],
      feverOptions: [
        { value: "1", label: "有发烧" },
        { value: "0", label: "无发烧" },
      ],
      temperatureOptions: [
        { value: "1", label: "大于37℃" },
        { value: "0", label: "小于37℃" },
      ],
      selectData: {
        coughData: "",
        feverData: "",
        temperatureData: "",
      },
      tableData: [],
      column: [
        { label: "工号", prop: "account" },
        { label: "姓名", prop: "name" },
        { label: "电话", prop: "telNum" },
        { label: "部门", prop: "department" },
        { label: "性别", prop: "sex" },
        { label: "是否离职", prop: "resignation" },
        { label: "是否启用", prop: "enable" },
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
      this.tableData = results;
      console.log(results);
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