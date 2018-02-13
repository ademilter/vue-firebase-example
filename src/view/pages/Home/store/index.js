// import HTTP from '@/utils/http'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    isLogin: state => state.user !== null
  },
  actions: {},
  mutations: {
    login (state, payload) {
      state.user = payload
    },
    logout (state) {
      state.user = null
    }
  }
}
