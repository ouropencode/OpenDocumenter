<template>
  <div id="app">
    <DocLayout />
  </div>
</template>

<script>
import DocLayout from "@/components/DocLayout"

export default {
  components: { DocLayout },
  mounted() {
    const hash = document.location.hash.substr(1)
    if(hash.length > 0)
      this.$smoothScroll(hash)
  },
  head: {
    title: function() {
      return {
        inner: `${this.$api.info.title} - ${this.$api.info.version}`,
        complement: this.$i18n("DOCUMENTATION"),
      }
    },
    meta: function() {
      return [
        { name: 'description', content: this.$api.info.description.substr(0, 160), vmid: 'index' },
      ]
    },
  }
}
</script>

<style lang="less">
@import "@/assets/theme.less";

body {
  .theme-font-body();
  background: @color-body-background;
  color: @color-body-text;
  margin: 0;
  padding: 0;
}

pre, code {
  .theme-font-code();
  padding: 0;
  margin: 0;
}

p {
  .theme-font-body();
}

a {
  color: @color-body-link;
  &:hover { color: @color-body-link-hover; }
}
</style>
