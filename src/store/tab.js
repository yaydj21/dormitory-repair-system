export default {
    state: {
        isCollapse: false,//控制菜单的展开
        tabList: [
            {
                index: "1",
                path: "/",
                name: "home",
                title: "主页",
                icon: "-s-home",
            }
        ],//面包屑数据
    },
    mutations: {
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        selectMenu(state,val){
            // 判断添加的数据是否为首页
            if(val.name !== 'home'){
                // 判断tab数组中是否存在点击的tab
                const flag = state.tabList.some(item => {
                    return item.name === val.name;
                })
                // 如果没有则添加到tab数组
                if(!flag){
                    state.tabList.push(val);
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state,item){
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index,1);
        }
    }
}