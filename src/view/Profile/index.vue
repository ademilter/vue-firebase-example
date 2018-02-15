<template lang="pug">
  .Popup.Profile
    .Popup-overlay(@click="close")
    .Popup-container
      .Popup-loading(v-show="profileLoading") Yükleniyor...
      .left
        Card(:data="form")
      .right
        form.Form(@submit.prevent="save")

          .Form-item
            input(type="text",
            class="text",
            :disabled="profileLoading",
            v-model="form.fullname")
          .Form-item
            input(type="text",
            class="text",
            :disabled="profileLoading",
            v-model="form.title")

          .Form-item.space
            input(type="text",
            class="text",
            :disabled="profileLoading",
            v-model="form.location")
          .Form-item
            label.label(
            :class="{ 'disabled' : profileLoading }")
              input(type="checkbox", v-model="form.status")
              span İş için uygunum

          .Form-item.social-item.social-item.space
            svg(class="icon")
              use(xlink:href="#icon-rss")
            input(type="text",
            class="text",
            :disabled="profileLoading",
            placeholder="Blog / Web Sitesi",
            v-model="form.social.rss")
          .Form-item.social-item.social-item
            svg(class="icon")
              use(xlink:href="#icon-twitter")
            input(type="text",
            class="text",
            :disabled="profileLoading",
            placeholder="Kullanıcı adı",
            v-model="form.social.twitter")
          .Form-item.social-item.social-item
            svg(class="icon")
              use(xlink:href="#icon-github")
            input(type="text",
            class="text",
            :disabled="profileLoading",
            placeholder="Kullanıcı adı",
            v-model="form.social.github")
          .Form-item.social-item.social-item
            svg(class="icon")
              use(xlink:href="#icon-dribbble")
            input(type="text",
            class="text",
            :disabled="profileLoading",
            placeholder="Kullanıcı adı",
            v-model="form.social.dribbble")

          .Form-item.social-item.space
            button.button.button-primary(
            type="submit",
            :disabled="profileLoading") Kartımı Ekle


</template>

<script>
  import Card from '@/view/card'
  import _ from 'lodash'
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
            rss: '',
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
      ]),
      profileLoading () {
        return this.$loading.isLoading('profile loading')
      }
    },
    mounted () {
      this.$loading.startLoading('profile loading')
      FIRESTORE
      .collection('Users')
      .doc(this.User.rawData.uid)
      .get()
      .then(doc => {
        if (_.has(doc.data(), 'cardData')) {
          this.$store.commit('Auth/saveCardData', doc.data().cardData)
          this.form.photo = this.User.cardData.photo
          this.form.fullname = this.User.cardData.fullname
          this.form.title = this.User.cardData.title
          this.form.location = this.User.cardData.location
          this.form.status = this.User.cardData.status
          this.form.social.twitter = this.User.cardData.social.twitter
          this.form.social.github = this.User.cardData.social.github
          this.form.social.dribbble = this.User.cardData.social.dribbble
        } else {
          this.form.photo = this.User.rawData.photoURL
          this.form.fullname = this.User.rawData.displayName
        }
        this.$loading.endLoading('profile loading')
      })
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
          .doc(this.User.rawData.uid)
          .update({
            cardData: this.form,
            hasCard: true
          }).then(() => {
            this.$store.commit('Home/resetCards', null, { root: true })
            this.$store.dispatch('Home/getCards', null, { root: true })
            this.$router.push({ name: 'Home' })
          })
        })
      },
      close () {
        this.$router.push({ name: 'Home' })
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
