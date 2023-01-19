<template>
  <div class="container">
    <!-- 对话框提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item
          v-for="item in column"
          :key="item.name"
          :label="item.label"
          :prop="item.prop"
        >
        <!-- {{item.prop}} -->
          <!-- <el-input v-model="tableData[tableIndex]"></el-input> -->
          <!-- {{tableData[tableIndex]}} -->
          <!-- {{tableData[tableIndex][item.prop]}} -->
          <el-input v-model="modelData"></el-input>
        </el-form-item>
        <!-- <el-form-item label="标题" prop="name">
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
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlerVisibleCancel()">取 消</el-button>
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
      default: () => false
    },
    tableData: {
      type: Array,
      default: () => {}
    },
    column: {
      type: Array,
      // 默认为一个空数组
      default: () => []
    },
    tableIndex: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      form: {
        titile: "",
        content: "",
        time: "",
      },
      form : this.tableData[0],
      rules: {
        title: [{ required: true, message: "请输入标题" }],
        content: [{ required: true, message: "请选择内容!!" }],
        time: [{ required: true, message: "请选择日期" }],
      },
      modelData:this.tableData[this.tableIndex],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$emit("update:dialogVisible", false);
          done();
        })
        .catch((_) => {
          this.$emit("update:dialogVisible", false);
        });
    },
    handlerVisible() {
      // this.$emit("update:tableData", this.tableData);
      // this.$emit("update:column", this.column);
      console.log(this.tableData);
      console.log(this.column);
      this.$emit("update:dialogVisible", false);
    },
    handlerVisibleCancel() {
      this.$emit("update:dialogVisible", false);
    }
  },
  mounted() {
    console.log(this.tableData);
    console.log(this.tableIndex);
    console.log(this.tableData[this.tableIndex]);
  }
};
</script>

<style>
</style>