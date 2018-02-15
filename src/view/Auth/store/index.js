import _ from 'lodash'

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
    saveRawData(state, payload) {
      console.log(payload)
      payload = JSON.parse(JSON.stringify(payload))
      payload = _.omit(payload, 'stsTokenManager')
      state.User.rawData = payload
    },
    saveCardData(state, payload) {
      state.User.cardData = JSON.parse(JSON.stringify(payload))
    },
    logout(state) {
      state.User.rawData = null
      state.User.cardData = null
    }
  }
}
