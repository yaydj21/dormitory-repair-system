<template>
  <div>
    <commond-table :column="column" :tableData="noticeArr" :buttonTypeArr="buttonTypeArr"></commond-table>
  </div>
</template>

<script>
import {getNoticeInfo} from '@/request/api/noticeApi.js'
export default {
  data(){
    return {
      // 表格的表头
      column:[
        {label:"标题",prop:"title"},
        {label:"内容",prop:"content"},
        {label:"时间",prop:"time"},
        // {label:"操作",prop:"operation"},
      ],
      // 表格的数据
      noticeArr:[],
      // 表格中按钮的类型
      buttonTypeArr:[
        {size:'mini',type:'',text:'编辑',methods:'edit'},
        {size:'mini',type:'danger',text:'删除',methods:'delete'}
      ]
    }
  },
  components:{
    // 引入表格组件
    'commond-table':() => import('@/components/CommonTable.vue')
  },
  methods:{
    // 获取通知数据方法
    async getNoticeInfo(){
      // 解构赋值data中的data数组
      const {data : {data : results}} = await getNoticeInfo();
      // 过滤出未删除的数据 0未删除 1已删除
      const filterResults = results.filter(val =>{
        return val.status === '0';
      })
      this.noticeArr = filterResults;
    }
  },
  mounted(){
    //调用获取通知数据方法
    this.getNoticeInfo();
    // getNotice().then(res =>{
    //   const {data : mRes} = res;
    //   console.log(mRes);
    // })
  }
}
</script>

<style lang="less" scoped>

</style>