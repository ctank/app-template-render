import createVuexStore from '@/store/createVuexStore'

const store = createVuexStore({
  namespaced: true,
  state: {
    demo: ''
  },
  actions: {
    setDemo({ commit }, val) {
      commit('setDemo', val)
    }
  },
  mutations: {
    setDemo(state, val) {
      state.demo = val
    }
  }
}
)

export default store
