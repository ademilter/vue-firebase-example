export default {
  namespaced: true,
  state: {
    User: {
      raw: null,
      card: null
    }
  },
  getters: {
    isLogin: state => state.User.raw !== null,
    hasCard: state => state.User.card !== null,
    User: state => state.User
  },
  actions: {},
  mutations: {
    saveRawData (state, payload) {
      state.User.raw = JSON.parse(JSON.stringify(payload))
    },
    saveCardData (state, payload) {
      state.User.card = JSON.parse(JSON.stringify(payload))
    },
    logout (state) {
      state.User.raw = null
      state.User.card = null
    }
  }
}
