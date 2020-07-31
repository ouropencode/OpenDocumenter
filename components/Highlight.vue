<template>
  <div :key="content+lang" class="highlight">
    <highlight-code :class="highlightClasses" :lang="realLang">{{ content }}</highlight-code>
  </div>
</template>

<script>
export default {
  props: ['content', 'lang', 'dark-mode'],
  computed: {
    realLang() {
      let lang = this.lang
      if(lang == "curl") lang = "bash"
      if(lang == "json") lang = "json"
      return lang
    },
    highlightClasses() {
      let lang = this.realLang

      const classes = {};
      classes['language-' + lang] = true

      if(this.darkMode) {
        classes['dark-mode'] = true
      } else {
        classes['light-mode'] = true
      }

      return classes;
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.highlight {
  pre {
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow-x: auto;

    background-color: @color-code-background !important;
    color: @color-code-text;

    code {
      word-break: break-all;
      white-space: pre-wrap !important;
      background-color: transparent !important;
    }

    &.light-mode {
      @import "~/assets/highlighter-theme-light.less";
    }
    &.dark-mode {
      @import "~/assets/highlighter-theme-dark.less";
      background-color: @color-code-dark-background !important;
      color: @color-code-dark-text;
    }
  }
}
</style>
