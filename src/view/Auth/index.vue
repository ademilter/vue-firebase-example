<template lang="pug">
  .Login.Popup
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
  import { AUTH, FIRESTORE } from '@/firebase'

  export default {
    name: 'Login',
    data () {
      return {
        alert: ''
      }
    },
    computed: {
      isAlert () {
        return this.alert !== ''
      }
    },
    methods: {
      login (provider) {
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
        AUTH.signInWithPopup(newProvider).then(result => {
          // giriş yaptı
          this.$store.commit('Auth/login', result.user, { root: true })
          //
          //
          const refUSERS = FIRESTORE.collection('Users')
          console.log(result.user.uid)

          refUSERS.doc(result.user.uid).get().then(doc => {
            console.log(doc)
            // if (!doc.exists) {
            console.log(result)
            //
            //
            // refUSERS.doc(result.user.uid).add({
            refUSERS.add({
              providerData: {
                ...result.user.providerData[0]
              }
            }).then(() => {
              this.$router.push({ name: 'Home' })
            }).catch(error => {
              console.error('Error writing document: ', error)
            })
            // }
          }).catch(error => {
            console.log('Error getting document:', error)
          })
        }).catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            // daha önce başka bir hesapla giriş yapmış
            AUTH.fetchProvidersForEmail(error.email)
                .then(providers => {
                  this.alert = 'daha önce ' + providers + ' hesabı ile giriş yapılmış.'
                })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .Login {
  }
</style>
