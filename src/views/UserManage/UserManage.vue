<template>
  <div class="manage">
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <!-- 搜索区域 -->
      <div class="search_bar">
        <el-input
          v-model="searchInput"
          placeholder="请输入要搜索的学号"
          class="search_input"
        ></el-input>
        <el-button icon="el-icon-search" @click="searchId(searchInput)"
          >搜索</el-button
        >
        <el-button icon="el-icon-search" @click="resetTable()">重置</el-button>
      </div>
      <common-table
        :column="column"
        :tableData="tableData"
        :buttonTypeArr="buttonTypeArr"
      ></common-table>
    </div>
  </div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { getAllStudentInfo, getIdStudents } from "@/request/api/studentApi.js";
export default {
  data() {
    return {
      searchInput: "",
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
        { label: "学号", prop: "account", type: "text" },
        { label: "密码", prop: "password", type: "text" },
        { label: "姓名", prop: "name", type: "text" },
        { label: "学院", prop: "college", type: "text" },
        { label: "班级", prop: "class", type: "text" },
        { label: "邮箱", prop: "email", type: "text" },
        { label: "电话号码", prop: "telNum", type: "text" },
        { label: "地址", prop: "address", type: "text" },
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
    async getAllStudentInfo() {
      // 解构赋值data中的data数组
      const {
        data: { data: results },
      } = await getAllStudentInfo();
      // 过滤出未删除的数据 0未删除 1已删除
      const filterResults = results.filter((val) => {
        return val.status === "0";
      });
      this.tableData = filterResults;
    },
    async searchId(account) {
      const {
        data: { data: res },
      } = await getIdStudents({ account: account });
      this.tableData = res;
    },
    resetTable() {
      this.getAllStudentInfo();
      this.searchInput = "";
    },
  },
  mounted() {
    this.getAllStudentInfo();
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
.search_bar {
  display: flex;
  .search_input {
    width: 500px;
    margin-right: 10px;
  }
}
</style>