<template lang="pug">
  .Home
    .container
      .List(v-if="hasCards")
        Card(
        v-for="Card in Cards",
        :key="Card.rawData.uid",
        :data="Card.cardData")

      .page
        button.button.button-inline(
        @click="next",
        :disabled="cardLoading",
        v-show="!isEndCard")
          span(v-show="cardLoading") Yükleniyor...
          span(v-show="!cardLoading") Sonraki

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
      ]),
      cardLoading () {
        return this.$loading.isLoading('loading cards')
      }
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
  @import "../../stylesheet/config/variables";

  .List {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .Card {
      margin: 10px;
    }
  }

  .page {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
</style>
