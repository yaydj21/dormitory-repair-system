<template>
  <el-row :gutter="20">
    <!-- 左侧区域 -->
    <el-col :span="8">
      <!-- 个人信息 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/logo.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>登录账号：<span>2113202040112</span></p>
          <p>所在学院：<span>信息技术学院</span></p>
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
  </el-row>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      // 通知栏的数据
      tableData: [
        {
          title: "通知1",
          time: "2016-05-02",
        },
        {
          title: "通知2",
          time: "2016-05-04",
        },
        {
          title: "通知3",
          time: "2016-05-01",
        },
        {
          title: "通知4",
          time: "2016-05-03",
        },
        {
          title: "通知4",
          time: "2016-05-03",
        },
        {
          title: "通知4",
          time: "2016-05-03",
        },
        {
          title: "通知4",
          time: "2016-05-03",
        },
        {
          title: "通知4",
          time: "2016-05-03",
        },
        {
          title: "通知4",
          time: "2016-05-03",
        },
      ],
      tableLabel: {
        title: "标题",
        time: "时间",
      },
      // 标签栏的数据
      countData: [
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#5ab1ef",
        },
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#ffb980",
        },
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#5ab1ef",
        },
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#ffb980",
        },
      ],
    };
  },
  mounted() {
    // 折线图
    const echarts1 = echarts.init(this.$refs.echarts1);
    var option1 = {
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    echarts1.setOption(option1);

    // 柱状图
    const echarts2 = echarts.init(this.$refs.echarts2);
    var option2 = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2016", "2017"],
          ["Matcha Latte", 85.8, 93.7],
          ["Milk Tea", 73.4, 55.1],
          ["Cheese Cocoa", 65.2, 82.5],
          ["Walnut Brownie", 53.9, 39.1],
        ],
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [ { type: "bar" }, { type: "bar" }],
    };
    echarts2.setOption(option2);

    // 柱状图
    const echarts3 = echarts.init(this.$refs.echarts3);
    var option3 = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
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
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    };

    echarts3.setOption(option3);

    window.addEventListener("resize", function () {
      echarts1.resize();
      echarts2.resize();
      echarts3.resize();
    });
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