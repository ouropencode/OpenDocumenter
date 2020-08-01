<template>
  <a :href="href" class="badge">
    <img :src="src" />
  </a>
</template>

<script>
export default {
  props: ['url', 'left', 'right', 'color', 'translate', 'href'],
  computed: {
    src() {
      if(this.url)
        return this.url;

      let left = this.left
      if(this.translate == "left" || this.translate == "both")
        left = this.$i18n(left).toLowerCase()

      let right = this.right
      if(this.translate == "right" || this.translate == "both")
        right = this.$i18n(right)

      return `https://img.shields.io/static/v1?`
        + `label=${encodeURIComponent(left)}`
        + `&message=${encodeURIComponent(right)}`
        + `&color=${encodeURIComponent(this.color)}`
    }
  }
}
</script>

<style lang="less">
.badge {
  display: inline-block;
  padding: 0 0.25em;
}
</style>
