<template>
  <div class="endpoint" :data-type="method" @click="copyText">
    <div class="endpoint__path" ref="text">
      {{ path }}
    </div>

    <div class="endpoint__method">
      {{ method }}
    </div>

    <div class="endpoint__hover">
      <span v-if="copied">{{ $i18n('COPIED') }}</span>
      <span v-else>{{ $i18n('CLICK_TO_COPY') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['method', 'path'],
  methods: {
    copyText() {
      clearTimeout(this.timeout)
      this.selectText(this.$refs.text)
      document.execCommand("copy")
      this.copied = true
      this.timeout = setTimeout(() => this.copied = false, 3000)
    },
    selectText(element) {
      var range
      if (document.selection) {
        range = document.body.createTextRange()
        range.moveToElementText(element)
        range.select()
      } else if (window.getSelection) {
        range = document.createRange()
        range.selectNode(element)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
      }
    }
  },
  data() {
    return {
      copied: false,
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

@border-radius: 0.5rem;

.endpoint {
  position: relative;
  display: flex;
  align-items: center;

  cursor: pointer;

  border-radius: @border-radius;

  background: @color-endpoint-unk;
  &[data-type="get"] { background: @color-endpoint-get; }
  &[data-type="put"] { background: @color-endpoint-put; }
  &[data-type="post"] { background: @color-endpoint-post; }
  &[data-type="delete"] { background: @color-endpoint-delete; }

  &__method {
    flex: 0 0 auto;

    color: @color-endpoint-text;
    font-weight: 600;
    font-size: 0.8em;
    text-transform: uppercase;

    padding: 0 0.75em;

    border-top-right-radius: @border-radius;
    border-bottom-right-radius: @border-radius;
  }

  &__path {
    .theme-font-code();
    flex: 0 0 auto;
    background-color: @color-code-dark-background;
    color: @color-code-dark-text;

    padding: 0.4em 0.5em 0.5em 0.5em;

    border-top-left-radius: @border-radius;
    border-bottom-left-radius: @border-radius;
  }

  &__hover {
    display: none;
    position: absolute;
    font-size: 0.8em;
    bottom: -1.25em;
    right: 0;
    opacity: 0.5;
  }

  &:hover {
    .endpoint__hover {
      display: block;
    }
  }
}
</style>
