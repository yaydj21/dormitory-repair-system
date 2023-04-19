<template>
  <div>
    <!-- form section start -->
    <section class="w3l-hotair-form">
      <h1>学生宿舍报修系统</h1>
      <div class="container">
        <!-- /form -->
        <div class="workinghny-form-grid">
          <div class="main-hotair">
            <div class="content-wthree">
              <h2>登录</h2>
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="account">
                  <el-input
                    type="text"
                    v-model="ruleForm.account"
                    autocomplete="off"
                    placeholder="账号"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    placeholder="密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >登录</el-button
                  >
                </el-form-item>
                <el-form-item class="radio">
                  <el-radio v-model="radio" label="0">管理员</el-radio>
                  <el-radio v-model="radio" label="1">维修员</el-radio>
                  <el-radio v-model="radio" label="2">学生</el-radio>
                </el-form-item>
              </el-form>

              <p class="account">
                没有账号?
                <span @click="goRegister()" class="register">注册</span>
              </p>
            </div>
            <div class="w3l_form align-self">
              <div class="left_grid_info">
                <img src="@/assets/background.png" alt="" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <!-- //form -->
      </div>
    </section>
    <!-- //form section start -->
  </div>
</template>

<script>
import { login } from "@/request/api/auth.js";
import jwtDecode from "jwt-decode";
export default {
  name: "Login",
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        setTimeout(() => {
          if (this.ruleForm.account !== "") {
            this.$refs.ruleForm.validateField("account");
          }
        }, 1000);
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        setTimeout(() => {
          if (this.ruleForm.password !== "") {
            this.$refs.ruleForm.validateField("password");
          }
        }, 1000);
        callback();
      }
    };
    return {
      ruleForm: {
        account: "2113202040112",
        password: "123456",
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
      //   单选属性
      radio: "0",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          this.$message({
            message: "请输入账号密码！",
            type: "error",
          });
          return false;
        }
      });
    },
    // 跳转到注册页面
    goRegister() {
      this.$router.push("/register");
    },
    // 登录接口
    async login() {
      console.log(this.ruleForm.password);
      const { data: res } = await login({
        account: this.ruleForm.account,
        password: this.ruleForm.password,
        role: this.radio,
      });
      if (res.status === 0) {
        this.$message({
          message: res.message,
          type: "success",
        });
        const code = jwtDecode(res.token);
        // 存入vuex
        this.$store.commit("updateTokenInfo", {tokenInfo:res.token,userInfo:code});
        this.$router.push("/home");
      }
      console.log(res.status);
      if (res.status === 1) {
        this.$message({
          message: res.message,
          type: "error",
        });
      }
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.radio {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
}
.register {
  cursor: pointer;
  color: #1da1f2;
}
html {
  scroll-behavior: smooth;
}
body,
html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.d-grid {
  display: grid;
}

.d-flex {
  display: flex;
  display: -webkit-flex;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

button,
input,
select {
  -webkit-appearance: none;
  outline: none;
}

button,
.btn,
select {
  cursor: pointer;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
}

ul {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}

p {
  color: #666;
  font-size: 16px;
  line-height: 25px;
  opacity: 0.6;
  text-align: center;
}

.p-relative {
  position: relative;
}

.p-absolute {
  position: absolute;
}

.p-fixed {
  position: fixed;
}

.p-sticky {
  position: sticky;
}

.btn,
button,
.actionbg,
input {
  border-radius: 36px;
  -webkit-border-radius: 36px;
  -moz-border-radius: 36px;
  -o-border-radius: 36px;
  -ms-border-radius: 36px;
}

.btn:hover,
button:hover {
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
}

/*-- wrapper start --*/
.wrapper {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .wrapper {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .wrapper {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .wrapper {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .wrapper {
    max-width: 1140px;
  }
}

.wrapper-full {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

/*-- //wrapper start --*/

/*-- form styling --*/
.w3l-hotair-form {
  position: relative;
  min-height: 100vh;
  z-index: 0;
  background: #0568c1;
  padding: 40px 40px;
  justify-content: center;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  align-items: center;
}
.container {
  max-width: 890px;
  margin: 0 auto;
}

.w3l_form {
  flex-basis: 50%;
  -webkit-flex-basis: 50%;
  background: #f4f9fd;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -ms-background-size: cover;
  padding: 40px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  display: grid;
}

.content-wthree {
  flex-basis: 50%;
  -webkit-flex-basis: 50%;
  box-sizing: border-box;
  padding: 3em 3em;
  background: #fff;
  box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.w3l-workinghny-form .logo {
  text-align: center;
}

.w3l-hotair-form .main-hotair {
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  margin: 40px 0;
}

.w3l-hotair-form form {
  margin-top: 30px;
}

.social-icons {
  text-align: center;
  margin-top: 16px;
}
p.account,
p.account a {
  text-align: center;
  padding-bottom: 0px;
  font-size: 16px;
  color: #333;
}

p.account a {
  color: #0568c1;
}
p.account a:hover {
  text-decoration: underline;
}
.w3l-hotair-form h1 {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
}

.w3l-hotair-form h2 {
  font-size: 30px;
  line-height: 40px;
  margin-bottom: 5px;
  font-weight: 900;
  color: #272346;
  text-align: center;
}

.w3l-hotair-form input {
  outline: none;
  margin-bottom: 15px;
  font-size: 16px;
  color: #999;
  text-align: left;
  padding: 14px 20px;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: #f7fafc;
  border: 1px solid #e5e5e5;
  transition: 0.3s ease;
  -webkit-transition: 0.3s ease;
  -moz-transition: 0.3s ease;
  -ms-transition: 0.3s ease;
  -o-transition: 0.3s ease;
}
.w3l-hotair-form input:focus {
  background: transparent;
  border: 1px solid #0568c1;
}
.w3l-hotair-form button {
  font-size: 18px;
  color: #fff;
  width: 100%;
  background: #0568c1;
  border: none;
  padding: 14px 15px;
  font-weight: 700;
  transition: 0.3s ease;
  -webkit-transition: 0.3s ease;
  -moz-transition: 0.3s ease;
  -ms-transition: 0.3s ease;
  -o-transition: 0.3s ease;
}

.w3l-hotair-form button:hover {
  background: #fdc500;
}

.w3l-hotair-form .social-icons ul li {
  list-style: none;
  display: inline-block;
}

.w3l-hotair-form .social-icons ul li a {
  padding: 8px;
}

.w3l-hotair-form .social-icons ul li a:hover {
  opacity: 0.8;
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
}

.w3l-hotair-form .social-icons ul span.fa {
  color: #696687;
  font-size: 18px;
  opacity: 0.8;
}

.w3l-hotair-form .social-icons ul li a.facebook span {
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 6px;
  border: 2px solid #696687;
  line-height: 32px;
}

.w3l-hotair-form .social-icons ul li a.twitter span {
  color: #1da1f2;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 6px;
  border: 2px solid #1da1f2;
  line-height: 32px;
}

.w3l-hotair-form .social-icons ul li a.pinterest span {
  color: #e60023;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 6px;
  border: 2px solid #e60023;
  line-height: 32px;
}

p.copy-footer-29 a {
  color: #fff;
}

p.copy-footer-29 a:hover {
  color: #fdc500;
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -o-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
}

/* -- placeholder --*/

/*-- responsive design --*/

@media (max-width: 736px) {
  .w3l-hotair-form .main-hotair {
    flex-direction: column;
  }
  .w3l-hotair-form form {
    margin-top: 30px;
  }
  .w3l_form {
    order: 2;
    border-radius: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 0;
  }
  .content-wthree {
    order: 1;
    border-radius: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}

@media (max-width: 568px) {
  .w3l-hotair-form h1 {
    font-size: 36px;
  }

  .w3l-hotair-form .main-hotair {
    margin: 30px 0;
  }

  .content-wthree {
    padding: 2.5em;
  }
}

@media (max-width: 480px) {
  .w3l-hotair-form {
    padding: 40px 30px;
  }
  .w3l-hotair-form h1 {
    font-size: 26px;
  }
}

@media (max-width: 384px) {
  .w3l-hotair-form {
    padding: 30px 15px;
  }

  .content-wthree {
    padding: 2em;
  }
  .w3l-hotair-form h2 {
    font-size: 22px;
    line-height: 32px;
  }
}
</style>