import Vue from 'vue'
import Vuex from 'vuex'

// Pages
import Home from '@/view/Home/store'
import Auth from '@/view/Auth/store'
import Profile from '@/view/Profile/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Home,
    Auth,
    Profile
  },
  strict: debug
})
