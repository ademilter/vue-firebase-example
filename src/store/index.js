import Vue from 'vue'
import Vuex from 'vuex'

// Pages
import Auth from '@/view/Auth/store'
import Profile from '@/view/Profile/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Auth,
    Profile
  },
  strict: debug
})
