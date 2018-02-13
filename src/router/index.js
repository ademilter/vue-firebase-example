import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/view/pages/Home/route'

Vue.use(Router)

const router = new Router({
  routes: [
    Home
  ]
})

export default router
