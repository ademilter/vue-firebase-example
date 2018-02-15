import { FIRESTORE } from '@/firebase'
import _ from 'lodash'
import { startLoading, endLoading } from '@/utils/loader'

export default {
  namespaced: true,
  state: {
    isFirstPage: true,
    perPage: 12,
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
    getCards({ state, commit, dispatch }) {
      startLoading(dispatch, 'loading cards')
      //
      let refUsers = FIRESTORE.collection('Users')
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
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          endLoading(dispatch, 'loading cards')
        })
    }
  },
  mutations: {
    resetCards(state) {
      state.isFirstPage = true
      state.isEnd = false
      state.lastVisible = null
      state.Cards = []
    },
    endCard(state) {
      state.isEnd = true
    },
    addCards(state, documentSnapshots) {
      if (state.isFirstPage) state.isFirstPage = false
      state.lastVisible = _.cloneDeep(documentSnapshots.docs[documentSnapshots.docs.length - 1])
      documentSnapshots.forEach(doc => {
        state.Cards.push(_.cloneDeep(doc.data()))
      })
    }
  }
}
