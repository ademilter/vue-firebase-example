import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import VeeValidate, { Validator } from 'vee-validate'
import tr from 'vee-validate/dist/locale/tr'
import VueLoading from 'vuex-loading'
// import '@/firebase'
import { AUTH } from '@/firebase'

Vue.config.productionTip = false
Validator.localize('tr', tr)

Vue.use(VueLoading)
Vue.use(VeeValidate, {
  events: 'input'
})

let app
AUTH.onAuthStateChanged(() => {
  if (!app) {
    console.log('app init')
    app = new Vue({
      el: '#app',
      router,
      store,
      vueLoading: new VueLoading({ useVuex: true }),
      template: '<App/>',
      components: { App }
    })
  }
})
