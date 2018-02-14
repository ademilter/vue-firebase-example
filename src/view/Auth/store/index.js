export default {
  namespaced: true,
  state: {
    User: null
  },
  getters: {
    isLogin: state => state.User !== null,
    User: state => {
      if (state.User !== null) return state.User.providerData[0]
      else return null
    }
  },
  actions: {},
  mutations: {
    login (state, payload) {
      state.User = JSON.parse(JSON.stringify(payload))
    },
    logout (state) {
      state.User = null
    }
  }
}
