<template lang="pug">
  a.Card-foot-social-link(
  :class="siteName"
  v-if="userName !== ''",
  :href="link",
  target="_blank")
    svg(class="icon")
      use(:xlink:href="'#icon-' + siteName")
</template>

<script>
  export default {
    name: 'CardSocialLink',
    props: {
      userName: {
        type: String,
        default: ''
      },
      siteName: {
        type: String,
        default: ''
      }
    },
    computed: {
      link () {
        let domain
        switch (this.siteName) {
          case 'twitter':
            domain = 'https://twitter.com/'
            break
          case 'github':
            domain = 'https://github.com/'
            break
          case 'dribbble':
            domain = 'https://dribbble.com/'
            break
        }
        return domain + this.userName
      }
    }
  }
</script>
