<template>
  <div class="entry-title" :id="$hashPath(path, method)">
    <div class="entry-title__title">
      <p>{{ title }}</p>
    </div>
    <div class="entry-title__endpoint">
      <endpoint :method="method" :path="path" />
    </div>
  </div>
</template>

<script>
import Endpoint from '@/components/Endpoint'

export default {
  components: { Endpoint },
  props: ['title', 'path', 'method']
}
</script>

<style lang="less">
@import "@/assets/theme.less";
@import "@/assets/utils.less";

.entry-title {
  width: 100%;
  display: flex;
  align-items: center;

  &__title {
    flex: 1 1 auto;
    min-width: 0;
    p {
      .truncated();
      .theme-font-entry-title();
    }
  }

  &__endpoint {
    flex: 0 0 auto;
    .theme-font-entry-title();
    font-size: 0.9em;
  }
}
</style>
