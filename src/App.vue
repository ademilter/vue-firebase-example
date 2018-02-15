<template lang="pug">
  .App
    Icon
    HeaderView
    main.Body
      router-view
</template>

<script>
  import Icon from '@/view/icon'
  import Header from '@/view/header'
  import { AUTH } from '@/firebase'

  export default {
    name: 'App',
    components: {
      Icon,
      HeaderView: Header
    },
    created() {
      const user = AUTH.currentUser
      if (user) this.$store.commit('Auth/saveRawData', user, { root: true })
    }
  }
</script>

<style lang="scss">
  @import 'stylesheet/app';

  body {
    background-color: #e5e5e5;
  }
</style>
