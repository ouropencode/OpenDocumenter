<template>
  <div class="layout">
    <div class="layout__sidebar">
      <DocSidebar />
    </div>
    <div class="layout__content">
      <DocHeader />
      <article v-for="tag in $api.tags" :key="tag.name">
        <DocTag :tag="tag" />
      </article>
      <DocFooter />
    </div>
  </div>
</template>

<script>
import DocSidebar from "~/components/DocSidebar"
import DocHeader from "~/components/DocHeader"
import DocTag from "~/components/DocTag"
import DocFooter from "~/components/DocFooter"

export default {
  components: { DocSidebar, DocHeader, DocTag, DocFooter },
  mounted() {
    console.log("API Loaded", this.$api)
  },
  head() {
    return {
      title: `${this.$api.info.title} - ${this.$api.info.version}`,
      meta: [
        { name: 'description', content: this.$api.info.description.substr(0, 160), vmid: 'index' }
      ]
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.layout {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &__sidebar {
    flex: 0 0 auto;
    width: 16em;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    background: @color-sidebar-background;
  }

  &__content {
    flex: 1 1 auto;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
