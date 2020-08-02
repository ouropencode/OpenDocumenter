<template>
  <markdown-it-vue-light class="markdown md-body" :content="content" />
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'

export default {
  props: ['content'],
  components: { MarkdownItVueLight }
}
</script>

<style lang="less">
@import "@/assets/theme.less";

.markdown {
  p {
    line-height: 1.5em;
  }

  blockquote {
    margin: 0;
    opacity: 0.8;
    font-size: 0.8em;
  }

  pre, code {
    background-color: @color-code-background !important;
    color: @color-code-text;
    @import "@/assets/highlighter-theme-light.less";
  }
}
</style>
