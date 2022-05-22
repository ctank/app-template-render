import { createStore } from 'vuex'
import dialogManager from '../components/dialogManager/dialogStore'

const createVuexStore = (modules) => {
  // 公共模块的vuex配置
  const store = createStore({
    state: {
      // token
      tokens: '',
      // 用户信息
      userData: {},
      // 左侧菜单收缩状态
      sliderOpenTool: false,
      // 全局loading显隐
      globalLoading: false
    },
    mutations: {
      // 全局loading状态
      setGlobalLoading(state, isLoading) {
        state.globalLoading = isLoading
      },
      // 获取左侧菜单收缩状态
      setSliderState(state) {
        state.sliderOpenTool = !state.sliderOpenTool
      },
      // 同步token
      setToken(state, val) {
        // // id
        // localStorage.setItem('USER_ID', USER_ID)
        // // 角色
        // localStorage.setItem('roles', roles)
        // // 用户名
        // localStorage.setItem('username', username)
        // // 有效时间
        // localStorage.setItem('userexp', exp)
      }
    },
    actions: {},
    getters: {
      getGloablLoading: (state) => {
        return state.globalLoading
      },
      getDevelopStatus: (state) => {
        return state.developStatus
      }
    },
    modules: Object.assign(
      {
        // 弹窗模块
        dialogManager
      },
      modules
    )
  })
  return store
}

export default createVuexStore
