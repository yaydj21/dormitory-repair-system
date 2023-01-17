<template>
  <header>
    <div class="l-content">
      <el-button
        @click="collapseMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in tabList"
          :key="item.index"
          >{{ item.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: "https://www.starbug.vip/oss/dormitory-bucket/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220709204911.jpg"
    };
  },
  methods: {
    // collapseMenu(){
    //   this.$store.commit('collapseMenu')
    // },
    ...mapMutations(["collapseMenu"]),
  },
  computed: {
    ...mapState({
      tabList: (state) => state.tab.tabList,
    }),

    // ...mapState('tab',['tabList']),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  .l-content {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        font-size: 16px;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
  .r-content {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>