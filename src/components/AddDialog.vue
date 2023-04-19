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
          v-for="(item, index) in dialogColumn"
          :key="index"
          :label="item.label"
          prop="name"
        >
          <el-input
            v-if="item.type === 'text'"
            v-model="dialogForm[item.prop]"
          ></el-input>
          <div v-else-if="item.type === 'image'">
            <!-- 维修图片区域 -->
            <div class="avatar-container" style="width: 500px">
              <el-col :span="12"> </el-col>
              <!-- 上传维修图片 -->
              <!-- id为文件名字 -->
              <el-col :span="12">
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <!-- 维修图片 -->
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlerVisible()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addOrder } from "@/request/api/repairOrderApi.js";
import { addNotice } from "@/request/api/noticeApi.js";
export default {
  inject: ["reload"],
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    dialogColumn: Array,
    dialogOrderId: String,
    dialogTime: String,
    dialogAddress: String,
  },
  data() {
    return {
      title: "编辑信息",
      // 将 dialogVisible 设置为本地 data 值
      localDialogVisible: this.dialogVisible,
      rules: {},
      dialogForm: {},
      form: {},
      // 订单图片格式：订单号.jpg
      // url: "https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg",
      // https://www.starbug.vip/oss/dormitory-bucket/2113202040112.jpg
      url: "",
      action: "",
      imageUrl: "",
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
      console.log(this.$route.path);
      const path = this.$route.path;
      if (path === "/myRepairManage") {
        this.addOrder();
      }
      if (path === "/noticeManage") {
        this.addNotice();
      }

      this.$emit("update:dialogVisible", false);
    },
    // 增加订单
    async addOrder() {
      console.log(this.dialogOrderId);
      this.dialogForm.orderId = this.dialogOrderId;
      this.dialogForm.address = this.dialogAddress;
      this.dialogForm.status = 0;
      //   获取当前账号
      this.dialogForm.applicant = JSON.parse(
        localStorage.getItem("state")
      ).userInfo.account;
      console.log(this.dialogForm);
      const { data: res } = await addOrder(this.dialogForm);
      if (res.status === "200") {
        this.$message({
          message: "添加成功！",
          type: "success",
        });
      }
      //   添加成功后刷新
      this.update();
    },
    async addNotice() {
      this.dialogForm.time = this.dialogTime;
      console.log(this.dialogForm);
      const { data: res } = await addNotice(this.dialogForm);
      console.log(res);
      if (res.status === "200") {
        this.$message({
          message: res.message,
          type: "success",
        });
        //   添加成功后刷新
        this.update();
      }
    },
    // 维修故障图片上传
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      this.dialogForm.faultPicture = res.url;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 维修故障图片上传
    beforeAvatarUpload(file) {
      console.log(file);
      // action格式 ：http://127.0.0.1:3007/student/uploadAvatar?id=2113202040112
      //   this.action = `http://127.0.0.1:3007/student/uploadAvatar?orderId=${this.dialogOrderId}`;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    update() {
      // 在需要用到的事件中调用this.reload()；函数即可
      this.reload();
    },
  },
  beforeUpdate() {
    // 修改action接口的文件名
    this.action = `http://127.0.0.1:3007/student/uploadAvatar?orderId=${this.dialogOrderId}`;
    this.url = `http://127.0.0.1:3007/student/uploadAvatar?orderId=${this.dialogOrderId}`;
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 30%;
  .input-container {
    margin-top: 20px;
  }
  .avatar-container {
    margin-top: 20px;
    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>