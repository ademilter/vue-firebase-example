<template lang="pug">
  .Popup.Profile
    .Popup-overlay(@click="")
    .Popup-container
      .left
        Card(:data="form")
      .right
        form.Form(@submit.prevent="save")

          .Form-item
            input(type="text",
            class="text",
            v-model="form.fullname")
          .Form-item
            input(type="text",
            class="text",
            v-model="form.title")

          .Form-item.space
            input(type="text",
            class="text",
            v-model="form.location")
          .Form-item
            label.label
              input(type="checkbox", v-model="form.status")
              span İş için uygunum

          .Form-item.social-item.social-item.space
            svg(class="icon")
              use(xlink:href="#icon-twitter")
            input(type="text",
            class="text",
            placeholder="Kullanıcı adı",
            v-model="form.social.twitter")
          .Form-item.social-item.social-item
            svg(class="icon")
              use(xlink:href="#icon-github")
            input(type="text",
            class="text",
            placeholder="Kullanıcı adı",
            v-model="form.social.github")
          .Form-item.social-item.social-item
            svg(class="icon")
              use(xlink:href="#icon-dribbble")
            input(type="text",
            class="text",
            placeholder="Kullanıcı adı",
            v-model="form.social.dribbble")

          .Form-item.social-item.space
            button.button(type="submit") Kartımı Ekle


</template>

<script>
  import Card from '@/view/card'
  import { mapGetters } from 'vuex'
  import { FIRESTORE } from '@/firebase'

  export default {
    name: 'Profile',
    components: {
      Card
    },
    data () {
      return {
        form: {
          photo: 'https://pbs.twimg.com/profile_images/959150465845022721/Y3crTOFR_400x400.jpg',
          fullname: 'Adem ilter',
          title: 'Frontend Developer',
          location: 'İstanbul',
          status: false,
          social: {
            twitter: '',
            github: '',
            dribbble: ''
          }
        }
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'User',
        'hasCard'
      ])
    },
    mounted () {
      if (this.hasCard) {
        this.form.photo = this.User.card.photo
        this.form.fullname = this.User.card.fullname
      } else {
        this.form.photo = this.User.raw.photoURL
        this.form.fullname = this.User.raw.displayName
      }
    },
    methods: {
      save (e) {
        e.preventDefault()
        this.$validator.validateAll().then(result => {
          // form error
          if (!result) return
          // store
          this.$store.commit('Auth/saveCardData', this.form, { root: true })
          // firestore
          FIRESTORE
          .collection('Users')
          .doc(this.User.raw.uid)
          .update({
            cardData: this.form,
            hasCard: true
          }).then(() => {
            this.$router.push({ name: 'Home' })
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../stylesheet/config/variables";

  .Profile {

    .Popup-container {
      display: flex;
      padding: 0;
      max-width: 700px;
    }

    .left {
      background-color: #e5e5e5;
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }

    .right {
      flex: 1;
      padding: 40px;
    }

    .space {
      margin-top: 30px;
    }

    .social-item {
      position: relative;

      .icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
      }

      .text {
        padding-left: 40px;
      }
    }

  }
</style>
