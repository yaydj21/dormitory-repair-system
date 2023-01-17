<template>
  <div class="tags">
    <el-tag v-for="(tag,index) in tags" :key="tag.index" :closable="tag.name !== 'home'" :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)" @close="handlerTag(tag,index)">
      {{ tag.title }}
    </el-tag>
  </div>
</template>

<script>
import { mapState , mapMutations} from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods:{
    // 点击tag跳转的功能
    changeMenu(item){
      this.$router.push({name:item.name});
    },
    // 点击tag删除的功能
    handlerTag(item,index){
      console.log("123");
      this.closeTag(item)
      const length = this.tags.length;
      // 删除之后的跳转逻辑
      if(item.name !== this.$route.name){
        return 
      }
      // 表示的是删除的最后一项
      if(index === length){
        this.$router.push({
          name:this.tags[index - 1].name
        })
      }else{
        this.$router.push({
          name:this.tags[index].name
        })
      }
    },
    ...mapMutations(['closeTag'])
  },
  computed: {
    // 返回的是对象 用...扩展运算符展开
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style lang="less" scoped>
.tags{
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>