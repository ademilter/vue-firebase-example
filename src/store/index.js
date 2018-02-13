import Vue from 'vue'
import Vuex from 'vuex'

// Pages
import Home from '@/view/pages/Home/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Home
  },
  strict: debug
})
