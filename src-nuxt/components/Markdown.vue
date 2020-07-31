<template>
  <div class="markdown" v-html="$md.render(content)"></div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.markdown {
  p {
    line-height: 1.5em;
    &:first-child {
      margin-top: 0;
    }
  }

  blockquote {
    margin: 0;
    opacity: 0.8;
    font-size: 0.8em;
  }

  pre, code {
    background-color: @color-code-background !important;
    color: @color-code-text;
    @import "~/assets/highlighter-theme-light.less";
  }
}
</style>
