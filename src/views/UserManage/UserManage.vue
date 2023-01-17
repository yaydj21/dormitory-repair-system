<template>
  <div class="manage">
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="birth">
          <el-col :span="20">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birth"
              style="width: 100%"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary">
        + 新增
      </el-button>
      <!-- <el-table :data="mockData" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="birth" label="日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table> -->
      <common-table :column="column" :tableData="tableData" :buttonTypeArr="buttonTypeArr"></common-table>
      <!-- 分页区域 -->
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { getStudentInfo } from "@/request/api/studentApi.js";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名字" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择日期" }],
      },
      mockData: [
        {
          id: 1,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 2,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 3,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 4,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 5,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 6,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 7,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 8,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 9,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 10,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
        {
          id: 11,
          name: "赵云",
          age: "12",
          sex: 1,
          birth: "1920-01-02",
        },
      ],
      modalType: 0, //0代表添加 1代表编辑
      tableData: [],
      column: [
        { label: "学号", prop: "account" },
        { label: "姓名", prop: "name" },
        { label: "学院", prop: "college" },
        { label: "班级", prop: "class" },
        { label: "邮箱", prop: "email" },
        { label: "电话号码", prop: "telNum" },
        { label: "楼栋号码", prop: "buildingNumber" },
        { label: "宿舍号码", prop: "dormNumber" },
      ],
      // 表格中按钮的类型
      buttonTypeArr: [
        { size: "mini", type: "", text: "编辑", methods: "edit" },
        { size: "mini", type: "danger", text: "删除", methods: "delete" },
      ],
    };
  },
  methods: {
    // 弹窗关闭的时候
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          // 重置表单
          this.$refs.form.resetFields();
          done();
        })
        .catch((_) => {});
    },
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid);//false时未填 true必填项已填写
        if (valid) {
          // 校验通过后 对表单的处理
          if (this.modalType === 0) {
            // 将填写的数据添加到数组
            this.mockData.unshift({ id: 7, ...this.form });
          } else {
            // 编辑后的数据提交
            this.mockData.splice(this.form.id - 1, 1, this.form);
            //TODO:编辑提交后 数据提交不上去 把reset里的重置表单注释就可以 下面直接替换也不行 要用splice
            // this.mockData[this.form.id - 1] = this.form;
          }
          // 重置表单并关闭弹窗
          this.reset();
        }
      });
    },
    reset() {
      // 重置表单
      this.$refs.form.resetFields();
      // 关闭弹窗
      this.dialogVisible = false;
    },
    cancel() {
      // 重置表单并关闭弹窗
      this.reset();
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.modalType = 1;
      // 对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async getStudentInfo() {
      // 解构赋值data中的data数组
      const {
        data: { data: results },
      } = await getStudentInfo();
      this.tableData = results;
    },
  },
  mounted() {
    this.getStudentInfo();
  },
  components: {
    CommonTable,
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>