<template>
  <div>
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 学号 -->
      <el-table-column
        prop="id"
        label="学号"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <!-- 姓名 -->
      <el-table-column
        prop="name"
        label="姓名"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <!-- 学院 -->
      <el-table-column
        prop="college"
        label="学院"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <!-- 班级 -->
      <el-table-column
        prop="class"
        label="班级"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <!-- 离校原因  原疫情以下-->
      <el-table-column
        prop="reason"
        label="离校原因"
        header-align="center"
        align="center"
        v-if="id === 'outSchoolManage'"
      >
      </el-table-column>
      <!-- 打卡时间 -->
      <el-table-column
        prop="time"
        label="打卡时间"
        header-align="center"
        align="center"
        v-if="id === 'healthRegister'"
      >
      </el-table-column>
      <el-table-column
        prop="timeSlot"
        label="时间段"
        header-align="center"
        align="center"
        v-if="id === 'healthRegister'"
      >
      </el-table-column>
      <el-table-column
        prop="actionTrajectory"
        label="行动轨迹"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="temperature"
        label="体温"
        header-align="center"
        align="center"
        v-if="id === 'healthRegister'"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.temperature <= 37 ? 'primary' : 'danger'"
            disable-transitions
            >{{ scope.row.temperature + "℃" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="cough"
        label="咳嗽"
        header-align="center"
        align="center"
        v-if="id === 'healthRegister'"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.cough === '无' ? 'primary' : 'danger'"
            disable-transitions
            >{{ scope.row.cough }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="fever"
        label="发烧"
        header-align="center"
        align="center"
        v-if="id === 'healthRegister'"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.fever === '无' ? 'primary' : 'danger'"
            disable-transitions
            >{{ scope.row.fever }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="departureTime"
        label="离校时间"
        header-align="center"
        align="center"
        v-if="id === 'outSchoolManage'"
      >
      </el-table-column>
      <el-table-column
        prop="returnTime"
        label="返校时间"
        header-align="center"
        align="center"
        v-if="id === 'outSchoolManage'"
      >
      </el-table-column>
      <el-table-column
        prop="approvalStatus"
        label="审批状态"
        header-align="center"
        align="center"
        v-if="id === 'outSchoolManage'"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.approvalStatus === '待审批' ? 'primary' : 'success'
            "
            disable-transitions
            >{{ scope.row.approvalStatus }}</el-tag
          >
        </template>
      </el-table-column>
      <!-- 原疫情以上 -->

      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        v-if="id === 'outSchoolManage'"
      >
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            icon="el-icon-check"
            type="success"
            circle
            @click="handleCheck(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-close"
            type="danger"
            circle
            @click="handleClose(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="id === 'healthRegister'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-delete"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: [
    "outSchoolManage",
    "healthRegister",
    "repairManage",
    "myRepairManage",
  ],
  data() {
    return {
      tableData: [],
      id: "",
    };
  },
  mounted() {
    if (this.healthRegister) {
      this.tableData = this.healthRegister.tableData;
      this.id = this.healthRegister.id;
    }
    // console.log(this.outSchoolManage);
    if (this.outSchoolManage) {
      this.tableData = this.outSchoolManage.tableData;
      this.id = this.outSchoolManage.id;
    }
    if (this.repairManage) {
      this.tableData = this.repairManage.tableData;
      this.id = this.repairManage.id;
    }
    if (this.myRepairManage) {
      this.tableData = this.myRepairManage.tableData;
      this.id = this.myRepairManage.id;
    }
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