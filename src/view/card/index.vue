<template lang="pug">
  .Card

    .Card-head
      .Card-head-photo
        img.Card-head-photo-img(
        src="https://pbs.twimg.com/profile_images/959150465845022721/Y3crTOFR_400x400.jpg",
        alt="username")
      .Card-head-user
        h4.Card-head-user-name Adem ilter
        p.Card-head-user-title Frontend Developer

    .Card-foot
      p.Card-foot-location İstanbul
      p.Card-foot-status.active İş için uygun
      .Card-foot-social
        a.Card-foot-social-link.gitub(
        href="/",
        target="_blank")
          svg(class="icon")
            use(xlink:href="#icon-twitter")
        a.Card-foot-social-link.dribble(
        href="/",
        target="_blank")
          svg(class="icon")
            use(xlink:href="#icon-medium")
        a.Card-foot-social-link.twitter(
        href="/",
        target="_blank")
          svg(class="icon")
            use(xlink:href="#icon-github")

</template>

<script>
  export default {
    name: 'Card',
    methods: {}
  }
</script>

<style lang="scss">
  @import "../../stylesheet/config/variables";

  .Card {
    width: 250px;
    height: 320px;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: 0 1px 2px rgba(black, .1);
    text-align: center;
    display: flex;
    flex-direction: column;

    &-head {
      padding: 20px 15px;

      &-photo {
        overflow: hidden;
        width: 80px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 42%;
        box-shadow: 0 2px 4px -1px rgba(black, .2);
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
      background-color: rgba(black, .04);
      color: rgba(black, .6);

      &-location {
      }

      &-status {
        margin-top: 3px;
        position: relative;
        display: inline-block;

        &:before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translate(-100%, -50%);
          font-size: 10px;
          margin-left: -7px;
          width: 1em;
          height: 1em;
          background-color: red;
          border-radius: 50%;
        }

        &.active:before {
          background-color: limegreen;
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
