<template>
  <div class="sidebar-tag" v-if="home">
    <a href="#" @click="click" class="sidebar-tag__name">{{ $api.info.title }}</a>
  </div>
  <div class="sidebar-tag" v-else>
    <a :href="href" @click="click" class="sidebar-tag__name">{{ tag.name }}</a>
    <div class="sidebar-tag__entries">
      <div v-for="(pathDef, path) in tag.paths" :key="path">
        <div v-for="(methodDef, method) in pathDef" :key="method">
          <DocSidebarEntry :definition="methodDef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocSidebarEntry from '~/components/DocSidebarEntry'

export default {
  props: ['tag', 'home'],
  components: { DocSidebarEntry },
  methods: {
    click(e) {
      e.preventDefault()
      this.$smoothScroll(this.home ? "" : this.$hashPath('', this.tag.name))
    },
  },
  computed: {
    href() {
      if(this.home)
        return "#top"
      return "#" + this.$hashPath('', this.tag.name)
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";
@import "~/assets/utils.less";

.sidebar-tag {
  &__name {
    .truncated();
    display: block;
    padding: 1em 1em 0.5em 1em;
    text-decoration: none;

    color: @color-sidebar-link;
    &:hover {
      color: @color-sidebar-link-hover;
    }
  }

  &__entries {
    font-size: 0.8em;
  }
}
</style>
