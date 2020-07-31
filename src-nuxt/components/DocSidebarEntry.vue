<template>
  <a :href="href" class="sidebar-entry" @click="click">
    <div class="sidebar-entry__title">{{ definition.summary }}</div>
    <div class="sidebar-entry__method" :data-type="definition.method">{{ definition.method }}</div>
  </a>
</template>

<script>
export default {
  props: ['definition'],
  methods: {
    click(e) {
      e.preventDefault()
      this.$smoothScroll(this.$hashPath(this.definition.path, this.definition.method))
    },
  },
  computed: {
    href() {
      return "#" + this.$hashPath(this.definition.path, this.definition.method);
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";
@import "~/assets/utils.less";

.sidebar-entry {
  display: flex;
  padding: 0.5em 1em 0.5em 1.5em;
  align-items: center;
  text-decoration: none;

  color: @color-sidebar-link;
  &:hover {
    color: @color-sidebar-link-hover;
  }

  &__title {
    .truncated();
    flex: 1 1 auto;
  }

  &__method {
    flex: 0 0 auto;
    text-transform: uppercase;
    font-size: 0.8em;
    padding-left: 0.5em;

    color: @color-endpoint-unk;
    &[data-type="get"] { color: @color-endpoint-get; }
    &[data-type="put"] { color: @color-endpoint-put; }
    &[data-type="post"] { color: @color-endpoint-post; }
    &[data-type="delete"] { color: @color-endpoint-delete; }
  }
}
</style>
