<template>
  <div class="req-body">
    <Highlight lang="json" :content="body.content['application/json'].example" />
  </div>
</template>

<script>
import Highlight from "@/components/Highlight"

export default {
  props: ['body'],
  components: { Highlight }
}
</script>

<style lang="less">
@import "@/assets/theme.less";

.req-body {
  padding-bottom: 1em;
}
</style>
