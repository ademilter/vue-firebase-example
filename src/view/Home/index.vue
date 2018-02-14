<template lang="pug">
  .Home
    template(v-if="isLogin")
      button(
      type="button",
      @click="logout") logout
      pre {{ User }}

    template(v-else)
      router-link(
      tag="button",
      type="button",
      :to="{ name: 'Login' }"
      ) kartını bırak

    router-view

</template>

<script>
  import { AUTH } from '@/firebase'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters('Auth', [
        'isLogin',
        'User'
      ])
    },
    methods: {
      logout () {
        AUTH.signOut().then(() => {
          this.$store.commit('Auth/logout', null, { root: true })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Home {
    padding: 50px;
  }
</style>
