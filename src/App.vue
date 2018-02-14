<template lang="pug">
  .App
    main.AppContent
      router-view
</template>

<script>
  import { AUTH } from '@/firebase'

  export default {
    name: 'App',
    created () {
      const user = AUTH.currentUser
      if (user) this.$store.commit('Auth/login', user, { root: true })
    }
  }
</script>

<style lang="scss">
  @import "stylesheet/app";
</style>
