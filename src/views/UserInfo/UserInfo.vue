<template>
  <div class="container">
    <!-- ID区域 -->
    <div class="user-name">
      <el-row type="flex" align="middle">
        <el-col :span="6"><p>ID:</p></el-col>
        <el-col :span="18"
          ><el-input
            placeholder="暂未有信息"
            v-model="inputData.account"
            :disabled="true"
          >
          </el-input
        ></el-col>
      </el-row>
    </div>
    <!-- SET name = ?, telNum = ?, department = ?, sex = ? -->
    <!-- 维修员信息修改 -->
    <div v-if="inputData.role === '1'">
      <!-- 姓名区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>姓名:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入姓名" v-model="inputData.name">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 电话区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>电话号码:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入电话号码" v-model="inputData.telNum">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 部门区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>部门:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入部门" v-model="inputData.department">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 性别区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>性别:</p></el-col>
          <el-col :span="18">
            <!-- <el-input placeholder="请输入性别" v-model="inputData.sex" ref="sex">
            </el-input> -->
            <el-select v-model="inputData.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 学生信息修改 -->
    <div v-if="inputData.role === '2'">
      <!-- 姓名区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>姓名:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入姓名" v-model="inputData.name">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 学院区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>学院:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入学院" v-model="inputData.college">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 班级区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>班级:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入班级" v-model="inputData.class">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 邮箱区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>邮箱:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入邮箱" v-model="inputData.email">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 电话区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>电话号码:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入电话号码" v-model="inputData.telNum">
            </el-input
          ></el-col>
        </el-row>
      </div>
      <!-- 地址区域 -->
      <div class="input-container">
        <el-row type="flex" align="middle">
          <el-col :span="6"><p>地址:</p></el-col>
          <el-col :span="18"
            ><el-input placeholder="请输入地址" v-model="inputData.address">
            </el-input
          ></el-col>
        </el-row>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="input-container">
      <el-row type="flex" align="middle">
        <el-col :span="6"></el-col>
        <el-col :span="18"
          ><el-button type="primary" @click="updateUserInfo(inputData)"
            >提交</el-button
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script>
import { updateUserInfo } from "@/request/api/auth.js";
export default {
  name: "UserInfo",
  data() {
    return {
      // 头像格式：id.jpg
      // https://www.starbug.vip/oss/dormitory-bucket/2113202040112.jpg
      url: "https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg",
      inputData: {},
      imageUrl: "",
      options: [
        { value: "男", label: "男" },
        {
          value: "女",
          label: "女",
        },
      ],
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
    //  调用获取id学生信息数据方法
    async getIdStudentInfo(account) {
      // // 解构赋值data中的data数组
      // const {
      //   data: {
      //     data: [results],
      //   },
      // } = await getIdStudentInfo({ account: account });
      // // 数据是否存在 0未删除 1已删除
      // if (results.status === "0") {
      //   this.inputData = results;
      // }
    },

    // 获取vuex中当前用户的信息
    getUserInfo() {
      this.inputData = this.$store.state.token.userInfo;
      // todo 修改后刷新显示0和1
      if (this.inputData.sex === 0) {
        this.inputData.sex = "女";
      }
      if (this.inputData.sex === 1) {
        this.inputData.sex = "男";
      }
    },
    // 更新用户数据
    async updateUserInfo(val) {
      console.log(val);
      if (val.sex === "女") {
        val.sex = 0;
      } else {
        val.sex = 1;
      }
      const { data: res } = await updateUserInfo(val);
      // 修改成功
      if (res.status === 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        // 存入vuex
        this.$store.commit("updateTokenInfo", {
          tokenInfo: localStorage.getItem("token"),
          userInfo: val,
        });
        this.getUserInfo();
      }
      // 修改失败
      if (res.status === 1) {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
    },
  },
  mounted() {
    //调用获取id学生信息数据方法
    // this.getIdStudentInfo();

    // 获取vuex中当前用户的信息
    this.getUserInfo();
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