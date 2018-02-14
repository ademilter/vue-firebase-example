<template lang="pug">
  header.Header
    template(v-if="isLogin")
      button(
      type="button",
      @click="logout") logout
    template(v-else)
      router-link(
      tag="button",
      type="button",
      :to="{ name: 'Auth' }"
      ) kartını bırak

</template>

<script>
  import { AUTH } from '@/firebase'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Card',
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

<style lang="scss">
  @import "../../stylesheet/config/variables";
</style>
