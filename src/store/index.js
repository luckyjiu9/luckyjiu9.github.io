import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
//vuex 注册给vue
Vue.use(Vuex);

//数据中心
let state = {
  token: ''
}
//actions 异步操作（定时器，ajax）
let actions = {
  // getsync (context, val) {
  //   //context 值得是上下文对象。
  //   context.commit('increament', val)
  // }
}
//mutations 同步修改state中的数据
let mutations = {
  // increament (state, val) {
  //   //state指的是 state数据中心
  //   state.count += val;
  // }
  toToke (state, val) {
    state.token = val
  }
}
// getters  可以对state中的数据进行计算。（相当于组件中的computed）
let getters = {
  // newVal: (state) => state.count * 2
}

//实例化 仓库
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState({
    storage: window.localStorage
  })] //会自动保存创建的状态。刷新还在
})



