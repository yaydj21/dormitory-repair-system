<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse()"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 class="title">{{ isCollapse() ? "后台" : "学生宿舍维修系统" }}</h3>
    <!-- 没有子项的 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.index"
      :index="item.index"
    >
      <i :class="'el-icon' + item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>

    <!-- 有子项的 chidlren -->
    <el-submenu
      v-for="item in hasChildren"
      :key="item.index"
      :index="item.index"
    >
      <template slot="title">
        <i :class="'el-icon' + item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </template>
      <el-menu-item-group
        v-for="childItem in item.child"
        :key="childItem.index"
      >
        <el-menu-item :index="childItem.index" @click="clickMenu(childItem)">
          <i :class="'el-icon' + childItem.icon"></i>
          <span slot="title">{{ childItem.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      // isCollapse: false,
      menuArr: [
        {
          index: "1",
          path: "/home",
          name: "home",
          title: "主页",
          icon: "-s-home",
        },
        {
          index: "2",
          path: "/userInfo",
          name: "userInfo",
          title: "个人信息",
          icon: "-user-solid",
        },
        {
          index: "3",
          path: "/maintainerManage",
          name: "maintainerManage",
          title: "维修员管理",
          icon: "-document-checked",
        },
        {
          index: "4",
          path: "/userManage",
          name: "userManage",
          title: "学生管理",
          icon: "-user-solid",
        },
        {
          index: "5",
          path: "/repairManage",
          name: "repairManage",
          title: "报修管理",
          icon: "-position",
          child: [
            {
              index: "5-1",
              path: "/repairManage",
              name: "repairManage",
              title: "维修列表",
              icon: "-s-grid",
            },
            {
              index: "5-2",
              path: "/myRepairManage",
              name: "myRepairManage",
              title: "我的维修",
              icon: "-menu",
            },
          ],
        },
        {
          index: "6",
          path: "/noticeManage",
          name: "noticeManage",
          title: "通知管理",
          icon: "-message-solid",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickMenu(item) {
      // 当页面路由与跳转的路由不一致时才跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit("selectMenu", item);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  computed: {
    // 过滤出没有子项的 并将对应的对象返回给数组
    noChildren() {
      return this.menuArr.filter((item) => !item.child);
    },
    // 过滤出有子项的
    hasChildren() {
      return this.menuArr.filter((item) => item.child);
    },
  },
  created() {
    console.log();
    const role = JSON.parse(localStorage.getItem("state")).userInfo.role;
    if (role === "0") {
      console.log("管理员");
    }
    if (role === "1") {
      this.menuArr = [
        {
          index: "1",
          path: "/home",
          name: "home",
          title: "主页",
          icon: "-s-home",
        },
        {
          index: "2",
          path: "/userInfo",
          name: "userInfo",
          title: "个人信息",
          icon: "-user-solid",
        },
        {
          index: "5",
          path: "/repairManage",
          name: "repairManage",
          title: "报修管理",
          icon: "-position",
          child: [
            {
              index: "5-1",
              path: "/repairManage",
              name: "repairManage",
              title: "维修列表",
              icon: "-s-grid",
            },
          ],
        },
      ];
    }
    if (role === "2") {
      this.menuArr = [
        {
          index: "1",
          path: "/home",
          name: "home",
          title: "主页",
          icon: "-s-home",
        },
        {
          index: "2",
          path: "/userInfo",
          name: "userInfo",
          title: "个人信息",
          icon: "-user-solid",
        },
        {
          index: "5",
          path: "/repairManage",
          name: "repairManage",
          title: "报修管理",
          icon: "-position",
          child: [
            {
              index: "5-2",
              path: "/myRepairManage",
              name: "myRepairManage",
              title: "我的维修",
              icon: "-menu",
            },
          ],
        },
      ];
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
  }
}
.title {
  width: 200px;
  padding: 20px;
}
</style>