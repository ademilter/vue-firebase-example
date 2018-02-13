<template lang="pug">
  .App
    AppHeader
    main.AppContent
      router-view
    AppFooter
</template>

<script>
  import { AUTH } from '@/firebase'
  import AppHeader from '@/view/global/app-header'
  import AppFooter from '@/view/global/app-footer'

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter
    },
    mounted () {
      AUTH.onAuthStateChanged(user => {
        if (!user) this.$store.commit('Home/logout', null, { root: true })
      })
    }
  }
</script>

<style lang="scss">
  @import "stylesheet/app";
</style>
