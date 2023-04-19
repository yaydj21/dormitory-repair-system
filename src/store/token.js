// 初始的 state 对象
let initState = {
    // token 的信息对象
    tokenInfo: {},
    userInfo:{}
}
const stateStr = localStorage.getItem('state');
if (stateStr) {
    // 加载本地的数据
    initState = JSON.parse(stateStr)
  }
export default {
    state: initState,
    mutations: {
        // 更新 tokenInfo 数据的方法
        updateTokenInfo(state, payload) {
            // 把提交过来的 payload 对象，作为 tokenInfo 的值
            state.tokenInfo = payload.tokenInfo;
            state.userInfo = payload.userInfo;
            // 如果希望在 Mutation A 中调用 Mutation B，需要通过 this.commit() 方法来实现
            // this 表示当前的 new 出来的 store 实例对象
            this.commit('saveStateToStorage');
        },
        // 将 state 持久化存储到本地
        saveStateToStorage(state) {
            localStorage.setItem('state', JSON.stringify(state));
        }
    }
}