<template lang="pug">
  .Popup.Auth
    .Popup-overlay(@click="")
    .Popup-container
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
      p.alert(v-show="isAlert") {{ alert }}
</template>

<script>
  import firebase from 'firebase'
  import { mapGetters } from 'vuex'
  import { AUTH, FIRESTORE } from '@/firebase'
  import _ from 'lodash'

  export default {
    name: 'Auth',
    data () {
      return {
        alert: ''
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'User'
      ]),
      isAlert () {
        return this.alert !== ''
      }
    },
    methods: {
      login (provider) {
        AUTH.signInWithPopup(this.newProvider(provider)).then(result => {
          // giriş yaptı
          this.$store.commit('Auth/saveRawData', result.user)
          //
          const refUSERS = FIRESTORE.collection('Users')
          //
          refUSERS
          .doc(result.user.uid)
          .get().then(doc => {
            //
            if (!doc.exists) {
              refUSERS
              .doc(result.user.uid)
              .set({
                rawData: this.User.raw,
                hasCard: false
              })
            }
            if (_.has(doc.data(), 'cardData')) {
              this.$router.push({ name: 'Home' })
            } else {
              this.$router.push({ name: 'Profile' })
            }
          })
        }).catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            // daha önce başka bir hesapla giriş yapmış
            AUTH.fetchProvidersForEmail(error.email).then(providers => {
              this.alert = 'daha önce ' + providers + ' hesabı ile giriş yapılmış.'
            })
          }
        })
      },
      newProvider (provider) {
        let newProvider
        switch (provider) {
          case 'github':
            newProvider = new firebase.auth.GithubAuthProvider()
            break
          case 'twitter':
            newProvider = new firebase.auth.TwitterAuthProvider()
            break
          default:
            newProvider = new firebase.auth.GoogleAuthProvider()
        }
        return newProvider
      }
    }
  }
</script>

<style lang="scss">
  .Auth {
  }
</style>
