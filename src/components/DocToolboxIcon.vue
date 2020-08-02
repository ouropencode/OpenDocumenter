<template>
  <div class="toolbox-icon" @click="$emit('click')">
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<script>
export default {
  props: ['icon']
}
</script>

<style lang="less">
@import "@/assets/theme.less";
@import "@/assets/utils.less";

.toolbox-icon {
  cursor: pointer;
  font-size: 1.25em;
  padding: 0.2em 0.4em;
  opacity: 0.5;
  &:hover {
    opacity: 1.0;
  }
}
</style>
