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
      </el-table-column>

      <!-- 操作区域 -->
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            v-for="buttons in buttonTypeArr"
            :key="buttons.type"
            :size="buttons.size"
            :type="buttons.type"
            @click="buttonHandler(scope.$index, scope.row, buttons.methods)"
            >{{ buttons.text }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框提示 -->
    <common-dialog :dialogVisible.sync='dialogVisible'></common-dialog>
  </div>
</template>

<script>
import { deleteNotices } from "@/request/api/noticeApi.js";
export default {
  data() {
    return {
      dialogVisible: false,
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
    buttonHandler(index, row, methods) {
      this[methods](index, row);
    },
    edit(index,row) {
      this.dialogVisible = true;
      console.log(index);
    },
    // 删除按钮的方法
    async delete(index, row) {
      const results = await deleteNotices({ id: row.id });
      if (results.status === 200) {
        const {data : {message}} = results;
        // 从index开始删除1个元素
        this.tableData.splice(index,1);
        this.$message({
          message:message,
          type: 'success'
          });
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
  },
  components:{
    'common-dialog':() => import('@/components/CommonDialog.vue')
  }
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
</style>