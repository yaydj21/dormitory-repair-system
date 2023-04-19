<template>
  <div class="container">
    <!-- 对话框提示 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-card class="box-card">
        <p class="title">{{ dialogData.title }}</p>
        <p class="content">{{ dialogData.content }}</p>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    dialogData: Object,
    dialogType: Object,
    dialogColumn: Array,
  },
  data() {
    return {
      title: "",
      // 将 dialogVisible 设置为本地 data 值
      localDialogVisible: this.dialogVisible,
      rules: {},
      dialogForm: {},
      form: {},
    };
  },
  methods: {
    handleClose() {
      // 更新本地 data 值，并通过 emit 发送事件通知父组件更新状态
      this.localDialogVisible = false;
      this.$emit("update:dialogVisible", this.localDialogVisible);
    },
    // 确定
    handlerVisible() {
      // 通知刷新页面
      //   this.$emit("data-updated", this.dialogForm.updateRole);
      this.$emit("update:dialogVisible", false);
    },
    update() {
      // 在需要用到的事件中调用this.reload()；函数即可
      this.reload();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-card__body {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .title {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 700;
  }
  .content {
    font-size: 16px;
  }
}
</style>