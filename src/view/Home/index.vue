<template lang="pug">
  .Home
    button(@click="next", v-show="!isEnd") next
    .List
      Card
    router-view
</template>

<script>
  import Card from '@/view/card'
  import { mapGetters } from 'vuex'
  import { FIRESTORE } from '@/firebase'

  export default {
    name: 'Home',
    data () {
      return {
        init: false,
        perPage: 1,
        isEnd: false
      }
    },
    components: {
      Card
    },
    computed: {
      ...mapGetters('Auth', [
        'isLogin'
      ])
    },
    mounted () {
      this.next()
    },
    methods: {
      next () {
        let first = FIRESTORE.collection('Users').limit(this.perPage)

        if (this.init) {
          first = first.startAfter(this._lastVisible)
        }
        this.init = true

        first.get().then(documentSnapshots => {
          console.log(documentSnapshots)
          if (documentSnapshots.empty) {
            this.isEnd = true
            return
          }
          this._lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
          documentSnapshots.forEach(doc => {
            let user = doc.data()
            console.log(user)
          })
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  .List {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .Card {
      margin: 10px;
    }
  }
</style>
