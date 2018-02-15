<template lang="pug">
  header.Header
    .container
      .auth
        template(v-if="isLogin")
          router-link(
          tag="button",
          type="button",
          :to="{ name: 'Profile' }"
          ) Kartımı Düzenle
          button(
          type="button",
          @click="logout"
          ) Çıkış yap
        template(v-else)
          router-link(
          tag="button",
          type="button",
          :to="{ name: 'Auth' }"
          ) Kartını bırak / (giriş)

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
      logout() {
        AUTH.signOut().then(() => {
          this.$store.commit('Auth/logout', null, { root: true })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../stylesheet/config/variables";

  .Header {
    .container {
      display: flex;
      align-items: center;
      height: 50px;

      .auth {
        margin-left: auto;

        button {
          margin-left: 20px;
        }
      }
    }
  }
</style>
