export default {
  namespaced: true,
  state: {
    User: {
      rawData: null,
      cardData: null
    }
  },
  getters: {
    isLogin: state => state.User.rawData !== null,
    hasCard: state => state.User.cardData !== null,
    User: state => state.User
  },
  actions: {},
  mutations: {
    saveRawData (state, payload) {
      state.User.rawData = JSON.parse(JSON.stringify(payload))
    },
    saveCardData (state, payload) {
      state.User.cardData = JSON.parse(JSON.stringify(payload))
    },
    logout (state) {
      state.User.rawData = null
      state.User.cardData = null
    }
  }
}
