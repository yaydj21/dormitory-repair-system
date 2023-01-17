<template>
  <div class="container">
    <!-- 对话框提示 -->
    <el-dialog
      title="提示"
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
        <el-form-item label="标题" prop="name">
          <el-input v-model="form.name"></el-input>
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
        <el-form-item label="内容" prop="sex">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlerVisible()">取 消</el-button>
        <el-button type="primary" @click="handlerVisible()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      // 默认为false
      default: () => false,
    },
  },
  data() {
    return {
      form: {
        titile: "",
        content: "",
        birth: "",
      },
      rules: {
        titile: [{ required: true, message: "请输入标题" }],
        content: [{ required: true, message: "请选择内容" }],
        birth: [{ required: true, message: "请选择日期" }],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handlerVisible() {
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style>
</style>