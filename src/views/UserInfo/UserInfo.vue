<template>
  <div class="container">
    <!-- ID区域 -->
    <div class="user-name">
      <el-row type="flex" align="middle">
        <el-col :span="6"><p>ID:</p></el-col>
        <el-col :span="18"
          ><el-input
            placeholder="2113202040112"
            v-model="inputData.idInput"
            :disabled="true"
          >
          </el-input
        ></el-col>
      </el-row>
    </div>
    <!-- 头像区域 -->
    <div class="avatar-container">
      <el-row type="flex" align="top">
        <el-col :span="6"><p>头像：</p></el-col>
        <el-col :span="18">
          <el-avatar
            shape="square"
            :size="178"
            fit="cover"
            :src="url"
          ></el-avatar>
          <!-- 上传头像 -->
          <!-- id为文件名字 -->
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3007/student/uploadAvatar?id=2113202040112"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
        ></el-col>
      </el-row>
      <!-- 头像 -->
    </div>
    <!-- 姓名区域 -->
    <div class="input-container">
      <el-row type="flex" align="middle">
        <el-col :span="6"><p>姓名:</p></el-col>
        <el-col :span="18"
          ><el-input
            placeholder="请输入姓名"
            v-model="inputData.nameInput"
          >
          </el-input
        ></el-col>
      </el-row>
    </div>
    <!-- 电话区域 -->
    <div class="input-container">
      <el-row type="flex" align="middle">
        <el-col :span="6"><p>电话号码:</p></el-col>
        <el-col :span="18"
          ><el-input
            placeholder="请输入电话号码"
            v-model="inputData.telInput"
          >
          </el-input
        ></el-col>
      </el-row>
    </div>
    <!-- 班级区域 -->
    <div class="input-container">
      <el-row type="flex" align="middle">
        <el-col :span="6"><p>班级:</p></el-col>
        <el-col :span="18"
          ><el-input
            placeholder="请输入班级"
            v-model="inputData.input"
          >
          </el-input
        ></el-col>
      </el-row>
    </div>
    <!-- 邮箱区域 -->
    <div class="input-container">
      <el-row type="flex" align="middle">
        <el-col :span="6"><p>邮箱:</p></el-col>
        <el-col :span="18"
          ><el-input
            placeholder="请输入邮箱"
            v-model="inputData.emailInput"
          >
          </el-input
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      url: "https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg",
      inputData: {
        idInput: '',
        nameInput: '',
        telInput: '',
        emailInput:''
      },
      imageUrl:''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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