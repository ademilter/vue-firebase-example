<template lang="pug">
  .Home
    template(v-if="!isLogin")
      button(
      type="button",
      @click="login('github')") login github
      br
      button(
      type="button",
      @click="login('google')") login google
      br
      button(
      type="button",
      @click="login('twitter')") login twitter
    template(v-else)
      button(
      type="button",
      @click="logout") logout

</template>

<script>
  import firebase from 'firebase'
  import { AUTH } from '@/firebase'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters('Home', [
        'isLogin'
      ])
    },
    methods: {
      login (social) {
        let provider
        switch (social) {
          case 'github':
            provider = new firebase.auth.GithubAuthProvider()
            break
          case 'twitter':
            provider = new firebase.auth.TwitterAuthProvider()
            break
          default:
            provider = new firebase.auth.GoogleAuthProvider()
        }
        AUTH
        .signInWithPopup(provider)
        .then(result => {
          // giriş yaptı
          console.log(result.user.providerData[0])
          this.$store.commit('Home/login', result.user.providerData[0])
        })
        .catch(error => {
          // giriş yaparken hata
          if (error.code === 'auth/account-exists-with-different-credential') {
            // daha önce başka bir hesapla giriş yapmış
            AUTH
            .fetchProvidersForEmail(error.email)
            .then(providers => {
              console.log('daha önce ' + providers + ' hesabı ile giriş yapılmış.')
            })
          }
        })
      },
      logout () {
        AUTH.signOut().then(() => {
          console.log('çıkış yaptı')
          // burada cache veya localstorage varsa silmek lazım
        })
      }
    }
  }
</script>

<style lang="scss">
  .Home {
    padding: 50px;
  }
</style>
