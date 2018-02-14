import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/view/Home'
import Auth from '@/view/Auth'
import Profile from '@/view/Profile'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'auth',
          name: 'Auth',
          component: Auth
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        }
      ]
    }
  ]
})

export default router
