<template>
  <div class="sidebar">
    <div>
      <DocSidebarTag :home="true" />
    </div>

    <div v-for="tag in $api.tags" :key="tag.name">
      <DocSidebarTag :tag="tag" />
    </div>
  </div>
</template>

<script>
import DocSidebarTag from '~/components/DocSidebarTag'

export default {
  components: { DocSidebarTag }
}
</script>

<style>
</style>
