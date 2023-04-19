<template>
  <el-row :gutter="20">
    <!-- 左侧区域 -->
    <el-col :span="8">
      <!-- 个人信息 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/logo.png" alt="" />
          <div class="userinfo">
            <p class="name">{{ getAccessInfo(userInfo.role) }}</p>
            <p class="access">{{ getAccessInfo(userInfo.role) }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            登录账号：<span>{{ userInfo.account }}</span>
          </p>
          <p v-if="userInfo.college">
            所在学院：<span>{{ userInfo.college }}</span>
          </p>
          <p v-if="userInfo.department">
            所在学院：<span>{{ userInfo.department }}</span>
          </p>
        </div>
      </el-card>

      <!-- 公告 -->
      <el-card class="bulletin-board">
        <el-table :data="tableData" style="width: 100%" height="406">
          <el-table-column
            v-for="(labels, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="labels"
          >
            <template #default="{ row }">
              <span @click="buttonHandler(row)" style="cursor: pointer">{{
                row[key]
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧区域 -->
    <el-col :span="16">
      <!-- 标签卡区域 -->
      <div class="num">
        <el-card
          v-for="(item, key) in countData"
          :key="key"
          :body-style="{ display: 'flex', padding: '0px' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">{{ item.name }}</p>
            <p class="desc">{{ item.value }}</p>
          </div>
        </el-card>
      </div>
      <!-- e-chart图表区域 -->
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 260px"></div>
        </el-card>
      </div>
    </el-col>
    <notice-dialog
      :dialogVisible.sync="dialogVisible"
      :dialogData="dialogData"
      :dialogColumn="dialogColumn"
    ></notice-dialog>
  </el-row>
</template>

<script>
import * as echarts from "echarts";
import { getNoticeInfo } from "@/request/api/noticeApi.js";
import {
  getHomeRepairTag,
  getRepairOrders7Days,
  getMonthRepairTypesRepairCount,
  getAllRepairTypesRepairCount,
} from "@/request/api/repairOrderApi.js";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogData: {},
      dialogColumn: [
        { label: "标题", prop: "title", type: "text" },
        { label: "内容", prop: "content", type: "text" },
      ],
      // 通知栏的数据
      tableData: [],
      tableLabel: {
        title: "标题",
        time: "时间",
      },
      // 标签栏的数据
      countData: [],
      //折线图
      echarts1: null,
      // 柱状图1
      echarts2: null,
      // 柱状图2
      echarts3: null,
      // 用户信息
      userInfo: {},
    };
  },
  mounted() {
    //调用获取通知数据方法
    this.getNoticeInfo();

    // 调用获取首页展示标签的数据方法
    this.getHomeRepairTag();

    // 获取今7日报修类型的方法
    this.getRepairOrders7Days();

    // 获取上个月和本月报修类型的方法
    this.getMonthRepairTypesRepairCount();

    // 获取系统全部报修类型的方法
    this.getAllRepairTypesRepairCount();

    // 获取vuex中当前用户的信息
    this.getUserInfo();

    // 折线图
    this.echarts1 = echarts.init(this.$refs.echarts1);

    // 柱状图
    this.echarts2 = echarts.init(this.$refs.echarts2);

    // 柱状图
    this.echarts3 = echarts.init(this.$refs.echarts3);

    window.addEventListener("resize", () => {
      this.echarts1.resize();
      this.echarts2.resize();
      this.echarts3.resize();
    });
  },
  methods: {
    // 获取通知数据方法
    async getNoticeInfo() {
      // 解构赋值data中的data数组
      const {
        data: { data: results },
      } = await getNoticeInfo();
      // 过滤出未删除的数据 0未删除 1已删除
      const filterResults = results.filter((val) => {
        return val.status === "0";
      });
      this.tableData = filterResults;
    },
    // 获取首页展示标签的数据
    async getHomeRepairTag() {
      // 解构赋值data中的data数组
      const { data: res } = await getHomeRepairTag();
      this.countData = res;
    },
    // 获取今日报修数量 设置到echarts1
    async getRepairOrders7Days() {
      const { data: res } = await getRepairOrders7Days();
      const option = {
        title: {
          text: "今日报修类型",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["水电故障", "网络故障", "门锁故障", "空调故障", "其他"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.dateList,
        },
        yAxis: {
          type: "value",
        },
        series: res.chartData,
      };
      this.echarts1.setOption(option);
    },
    // 获取上个月和本月报修类型的方法 设置到echarts2
    async getMonthRepairTypesRepairCount() {
      const { data: res } = await getMonthRepairTypesRepairCount();
      const option = {
        title: {
          text: "每月报修类型",
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: res,
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }],
      };
      this.echarts2.setOption(option);
    },
    // 获取系统全部报修类型的方法 设置到echarts3
    async getAllRepairTypesRepairCount() {
      const { data: res } = await getAllRepairTypesRepairCount();
      const option = {
        title: {
          text: "报修类型统计",
          left: "center",
          textStyle: {
            fontSize: "16",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "8%",
          left: "center",
        },
        series: [
          {
            name: "类型",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "200",
              },
            },
            labelLine: {
              show: false,
            },
            data: res,
          },
        ],
      };
      this.echarts3.setOption(option);
    },
    // 获取vuex中当前用户的信息
    getUserInfo() {
      this.userInfo = this.$store.state.token.userInfo;
    },
    // 判断权限展示文本
    getAccessInfo(userinfo) {
      if (userinfo === "0") {
        return "管理员";
      }
      if (userinfo === "1") {
        return "维修员";
      }
      if (userinfo === "2") {
        return "学生";
      }
    },
    buttonHandler(row) {
      console.log(row);
      this.dialogData = row;
      this.dialogVisible = true; // 打开弹窗
    },
  },
  components: {
    "notice-dialog": () => import("@/components/NoticeDialog.vue"),
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.bulletin-board {
  margin-top: 20px;
}
.num {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin-left: 30px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .el-card {
    width: 48%;
  }
}
</style>