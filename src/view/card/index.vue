<template lang="pug">
  .Card

    .Card-head
      .Card-head-photo
        img.Card-head-photo-img(
        :src="cleanPhoto",
        :alt="data.fullname")
      .Card-head-user
        h4.Card-head-user-name.textFit {{ data.fullname }}
        p.Card-head-user-title.textFit {{ data.title }}

    .Card-foot
      p.Card-foot-location.textFit {{ data.location }}
      p.Card-foot-status(
      :class="{ 'active' : data.status }"
      ) {{ statusText }}
      .Card-foot-social
        CardSocialLink(
        v-for="(value, keyName) in data.social",
        :userName="value",
        :key="keyName",
        :siteName="keyName")

</template>

<script>
  import CardSocialLink from './link'

  export default {
    name: 'Card',
    components: {
      CardSocialLink
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    computed: {
      cleanPhoto() {
        return this.data.photo.replace(/_normal/i, '_400x400')
      },
      statusText() {
        return this.data.status ? 'İş için uygun' : 'İş için uygun değil'
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import '../../stylesheet/config/variables';

  .Card {
    width: 250px;
    height: 320px;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: 0 1px 2px rgba(black, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;

    &-head {
      padding: 20px 15px;

      &-photo {
        overflow: hidden;
        width: 80px;
        height: 80px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 42%;
        box-shadow: 0 2px 4px -1px rgba(black, 0.2);
      }

      &-user {
        margin-top: 14px;
      }
    }

    &-foot {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px 15px;
      background-color: rgba(black, 0.04);
      color: rgba(black, 0.6);

      &-location {
      }

      &-status {
        margin-top: 3px;
        position: relative;
        display: inline-block;

        &:before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translate(-100%, -50%);
          font-size: 10px;
          margin-left: -7px;
          width: 1em;
          height: 1em;
          background-color: $color-warning;
          border-radius: 50%;
        }

        &.active:before {
          background-color: $color-success;
        }
      }

      &-social {
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        &-link {
          display: flex;
          font-size: 20px;
          width: 1em;
          height: 1em;

          & + & {
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
