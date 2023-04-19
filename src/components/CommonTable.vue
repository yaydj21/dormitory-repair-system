<template>
  <div class="container">
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 文字区域 -->
      <el-table-column
        v-for="item in column"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
      >
        <template v-slot="{ row }">
          <span
            v-if="item.type === 'text'"
            :class="getStatusClass(row[item.prop], item.prop)"
            >{{ displayText(row[item.prop], item.prop) }}</span
          >
          <el-image
            v-else-if="item.type === 'image'"
            style="width: 100px; height: 100px"
            :src="row[item.prop]"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 操作区域 -->
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            v-for="buttons in buttonTypeArr"
            :key="buttons.type"
            :size="buttons.size"
            :type="buttons.type"
            @click="
              buttonHandler(scope.$index, scope.row, buttons.methods, column)
            "
            >{{ buttons.text }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框提示 -->
    <!-- todo :判断表格内容 给类型 -->
    <common-dialog
      :dialogVisible.sync="dialogVisible"
      :dialogData="dialogData"
      :dialogMethod="dialogMethod"
      :dialogForm="dialogForm"
    ></common-dialog>
  </div>
</template>

<script>
import { deleteNotices } from "@/request/api/noticeApi.js";
import { orderDataDelete } from "@/request/api/repairOrderApi.js";
import { maintainerInfoDelete } from "@/request/api/maintainerApi.js";
import { studentInfoDelete } from "@/request/api/studentApi.js";
export default {
  data() {
    return {
      dialogVisible: false,
      value: true,
      dialogData: [],
      dialogForm: {},
      dialogMethod: "",
    };
  },
  props: {
    column: {
      type: Array,
      // 默认为一个空数组
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    buttonTypeArr: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 动态绑定的按钮方法
    async buttonHandler(index, row, methods, column) {
      // row为数据
      // 修改成适合的对象格式
      const data = column.map((item) => ({
        label: item.label,
        prop: item.prop,
        data: row[item.prop],
        type: item.type,
      }));
      const form = {};
      for (let i = 0; i < column.length; i++) {
        form[column[i].prop] = row[column[i].prop];
      }
      if (methods === "edit") {
        if (row.sex === 0) {
          form.sex = "女";
        }
        if (row.sex === 1) {
          form.sex = "男";
        }
        if (row.enable === 0) {
          form.enable = "未启用";
        }
        if (row.enable === 1) {
          form.enable = "已启用";
        }
        console.log(row.status);
        if (row.status === 0) {
          form.status = "未审核";
        }
        if (row.status === 1) {
          form.status = "已审核";
        }
        if (row.status === 2) {
          form.status = "已完成";
        }
        if (row.status === 3) {
          form.status = "已失败";
        }

        this.dialogVisible = true; // 打开弹窗
        form.role = this.$store.state.token.userInfo.role; //当前用户的权限
        form.updateRole = row.role; //选择当前行数据的role权限添加到form表单对象中
        form.id = row.id;
        form.column = this.column;
        this.dialogData = data; // 将当前行数据传递给弹窗组件
        this.dialogForm = form;
        console.log(this.dialogForm);
        this.dialogMethod = methods; // 将当前点击的按钮方法传递给弹窗组件
      }
      if (methods === "delete") {
        this.delete(index, row);
      }
    },
    updateDialogVisible(value) {
      this.dialogVisible = value;
    },
    // 删除按钮的方法
    async delete(index, row) {
      console.log(index, row);
      const routePath = this.$route.path;
      if (routePath === "/maintainerManage") {
        console.log("/maintainerManage");
        const res = await maintainerInfoDelete({ account: row.account });
        if (res.status === 200) {
          const {
            data: { message },
          } = res;
          // 从index开始删除1个元素
          this.tableData.splice(index, 1);
          this.$message({
            message: message,
            type: "success",
          });
        }
      }
      if (routePath === "/userManage") {
        console.log("/userManage");
        const results = await studentInfoDelete({ account: row.account });
        if (results.status === 200) {
          const {
            data: { message },
          } = results;
          // 从index开始删除1个元素
          this.tableData.splice(index, 1);
          this.$message({
            message: message,
            type: "success",
          });
        }
      }
      // 通知管理的删除方法
      if (routePath === "/noticeManage") {
        console.log("/noticeManage");
        const results = await deleteNotices({ id: row.id });
        if (results.status === 200) {
          const {
            data: { message },
          } = results;
          // 从index开始删除1个元素
          this.tableData.splice(index, 1);
          this.$message({
            message: message,
            type: "success",
          });
        }
      }
      if (routePath === "/repairManage" || routePath === "/myRepairManage") {
        console.log("/repairManage");
        const res = await orderDataDelete({ orderId: row.orderId });
        if (res.status === 200) {
          const {
            data: { message },
          } = res;
          // 从index开始删除1个元素
          this.tableData.splice(index, 1);
          this.$message({
            message: message,
            type: "success",
          });
        }
      }
    },
    // 对话框的方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSwitch(index, row) {
      console.log(index, row);
    },
    // 判断展示数据的方法
    displayText(value, props) {
      if (props === "sex") {
        if (value === 0) {
          return "女";
        } else if (value === 1) {
          return "男";
        }
      } else if (props === "status") {
        if (value === 0) {
          return "未审核";
        } else if (value === 1) {
          return "已审核";
        } else if (value === 2) {
          return "已完成";
        } else if (value === 3) {
          return "已失败";
        }
      } else if (props === "enable") {
        if (value === 0) {
          return "未启用";
        } else {
          return "已启用";
        }
      } else {
        return value;
      }
    },
    // 添加css样式的方法
    getStatusClass(status, props) {
      if (props === "sex") {
        return "";
      } else {
        return {
          "status-0": status === 0,
          "status-1": status === 1,
          "status-2": status === 2,
          "status-3": status === 3,
          "": ![0, 1, 2, 3].includes(status),
        };
      }
    },
  },
  components: {
    "common-dialog": () => import("@/components/CommonDialog.vue"),
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table .cell {
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  display: -webkit-box;
  -webkit-line-clamp: 1; // 超出多少行
  -webkit-box-orient: vertical;
}
.status-0,
.status-1,
.status-2,
.status-3 {
  background-color: #ecf5ff;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
.status-0 {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.status-2 {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}

.status-3 {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
.status-other {
  color: gray;
}
</style>