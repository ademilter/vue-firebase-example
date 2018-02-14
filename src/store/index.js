import Vue from 'vue'
import Vuex from 'vuex'

// Pages
import Auth from '@/view/Auth/store'
import Profile from '@/view/Profile/store'
import Home from '@/view/Home/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Auth,
    Profile,
    Home
  },
  strict: debug
})
