<template>
  <div class="example">
    <div class="example__title">{{ title }}</div>
    <highlight :dark-mode="true" :lang="lang" :content="content" />
  </div>
</template>

<script>
import Highlight from "~/components/Highlight"

export default {
  props: ['title', 'content', 'lang'],
  components: { Highlight }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.example {
  padding-top: 0.75em;
  padding-bottom: 1em;

  &__title {
    color: @color-split-text;
    font-size: 0.8em;
    text-transform: uppercase;
    padding: 1em;
    opacity: 0.9;
  }

  pre {
    padding: 1em;
  }
}
</style>
