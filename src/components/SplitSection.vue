<template>
  <div class="split-section">
    <div class="split-section__main">
      <slot></slot>
    </div>
    <div class="split-section__side" :class="{'no-padding': noPadding}">
      <slot name="side"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['no-padding']
}
</script>

<style lang="less">
@import "@/assets/theme.less";

.split-section {
  display: flex;

  &__main {
    flex: 0 0 auto;
    width: 60%;
    padding: 1rem;
    box-sizing: border-box;
  }

  &__side {
    flex: 0 0 auto;
    width: 40%;
    padding-top: 1rem;
    background: @color-split-background;
    box-sizing: border-box;
    &.no-padding { padding: 0; }
  }
}
</style>
