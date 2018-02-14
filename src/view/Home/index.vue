<template lang="pug">
  .Home
    button(@click="next", v-show="!isEndCard") next
    .List(v-if="hasCards")
      Card(
      v-for="Card in Cards",
      :key="Card.rawData.uid",
      :data="Card.cardData")
    router-view
</template>

<script>
  import Card from '@/view/card'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    components: {
      Card
    },
    computed: {
      ...mapGetters('Home', [
        'isEndCard',
        'hasCards',
        'Cards'
      ])
    },
    mounted () {
      this.$store.dispatch('Home/getCards')
    },
    methods: {
      next () {
        this.$store.dispatch('Home/getCards')
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
