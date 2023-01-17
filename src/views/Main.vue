<template>
  <div class="container">
    <el-container style="height: 100%">
      <!-- 左边侧边栏 -->
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>

      <!-- 右侧部分 -->
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag ></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import commonAside from "../components/CommonAside.vue";
import commonHeader from "../components/CommonHeader.vue";
import commonTag from "../components/CommonTag.vue";
export default {
  name: "Home",
  components: {
    commonAside,
    commonHeader,
    commonTag,
  },
};
</script>

<style lang="less" scoped>
.container {
  // width: 100vw;
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-main {
  padding: 20px 20px 0 20px;
}
.el-aside {
  // background-color: #ccc;
}
</style>
