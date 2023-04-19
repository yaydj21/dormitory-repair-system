<template>
  <div class="container">
    <!-- 对话框提示 -->
    <el-dialog
      :title="title"
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
        <el-form-item
          v-for="(item, index) in dialogData"
          :key="index"
          :label="item.label"
          prop="name"
        >
          <el-input
            v-if="item.type === 'text'"
            v-model="dialogForm[item.prop]"
          ></el-input>
          <el-image
            v-else-if="item.type === 'image'"
            style="width: 180px; height: 180px"
            :src="item.data"
            fit="contain"
          ></el-image>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlerVisible()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserInfo } from "@/request/api/auth.js";
import { updateNotices } from "@/request/api/noticeApi.js";
import { updateRepairIdOrderInfo } from "@/request/api/repairOrderApi.js";
export default {
  inject: ["reload"],
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    dialogData: Array,
    dialogMethod: String,
    dialogForm: Object,
    dialogRole: Number,
  },
  data() {
    return {
      title: "编辑信息",
      // 将 dialogVisible 设置为本地 data 值
      localDialogVisible: this.dialogVisible,
      form: this.dialogForm,
      rules: {
        titile: [{ required: true, message: "请输入标题" }],
        content: [{ required: true, message: "请选择内容" }],
        birth: [{ required: true, message: "请选择日期" }],
      },
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
      this.$emit("data-updated", this.dialogForm.updateRole);
      if (this.dialogForm.sex === "女") {
        this.dialogForm.sex = 0;
      }
      if (this.dialogForm.sex === "男") {
        this.dialogForm.sex = 1;
      }
      if (this.dialogForm.enable === "未启用") {
        this.dialogForm.enable = 0;
      }
      if (this.dialogForm.enable === "已启用") {
        this.dialogForm.enable = 1;
      }
      if (this.dialogForm.status === "未审核") {
        this.dialogForm.status = 0;
      }
      if (this.dialogForm.status === "已审核") {
        this.dialogForm.status = 1;
      }
      if (this.dialogForm.status === "已完成") {
        this.dialogForm.status = 2;
      }
      if (this.dialogForm.status === "已失败") {
        this.dialogForm.status = 3;
      }
      if (this.$route.path === "/noticeManage") {
        this.updateNotices(this.dialogForm);
      }
      if (
        this.$route.path === "/userInfo" ||
        this.$route.path === "/maintainerManage" ||
        this.$route.path === "/userManage"
      ) {
        this.updateUserInfo(this.dialogForm);
      }

      if (this.$route.path === "/repairManage") {
        this.updateRepairIdOrderInfo(this.dialogForm);
      }
      if (this.$route.path === "/myRepairManage") {
        this.updateRepairIdOrderInfo(this.dialogForm);
      }

      this.$emit("update:dialogVisible", false);
    },
    async updateUserInfo(val) {
      console.log(val);
      const { data: res } = await updateUserInfo(val);
      // 修改成功
      if (res.status === 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        // 在这里重新获取数据来更新页面显示
        this.update();
      }
      // 修改失败
      if (res.status === 1) {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
    async updateNotices(val) {
      const { data: res } = await updateNotices(val);
      // 修改成功
      if (res.status === 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        // 在这里重新获取数据来更新页面显示
        this.update();
      }
      // 修改失败
      if (res.status === 1) {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
    async updateRepairIdOrderInfo(val) {
      const { data: res } = await updateRepairIdOrderInfo(val);
      // // 修改成功
      if (res.status === 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        // 在这里重新获取数据来更新页面显示
        this.update();
      }
      // 修改失败
      if (res.status === 1) {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
    update() {
      // 在需要用到的事件中调用this.reload()；函数即可
      this.reload();
    },
  },
};
</script>

<style>
</style>