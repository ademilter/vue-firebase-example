import { FIRESTORE } from '@/firebase'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    init: false,
    isFirstPage: true,
    perPage: 30,
    isEnd: false,
    lastVisible: null,
    Cards: []
  },
  getters: {
    hasCards: state => state.Cards.length > 0,
    isEndCard: state => state.isEnd,
    Cards: state => state.Cards
  },
  actions: {
    getCards ({ state, commit }) {
      let refUsers =
        FIRESTORE
        .collection('Users')
        .where('hasCard', '==', true)
        .limit(state.perPage)

      if (!state.isFirstPage) {
        refUsers = refUsers.startAfter(state.lastVisible)
      }

      refUsers
      .get()
      .then(documentSnapshots => {
        if (documentSnapshots.empty) {
          commit('endCard')
          return
        }
        commit('addCards', documentSnapshots)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mutations: {
    endCard (state) {
      state.isEnd = true
    },
    addCards (state, documentSnapshots) {
      if (state.isFirstPage) state.isFirstPage = false
      state.lastVisible = _.cloneDeep(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      documentSnapshots.forEach(doc => {
        console.log(JSON.parse(JSON.stringify(doc.data())))
        state.Cards.push(JSON.parse(JSON.stringify(doc.data())))
      })
    }
  }
}
