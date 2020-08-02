<template>
  <div class="req-response">
    <div class="req-response__code">
      <StatusCode :code="code" />
    </div>
    <div class="req-response__response">
      {{ response.description }}
      <Highlight v-if="response.content" lang="json" :content="response.content['application/json'].example" />
    </div>
  </div>
</template>

<script>
import Highlight from "@/components/Highlight"
import StatusCode from "@/components/StatusCode"

export default {
  props: ['code', 'response'],
  components: { Highlight, StatusCode }
}
</script>

<style lang="less">
@import "@/assets/theme.less";

.req-response {
  display: flex;

  &__code {
    flex: 0 0 auto;
    width: 5em;
    padding: 0.5em;
    text-align: right;
  }

  &__response {
    flex: 1 1 auto;
    padding: 0.5em;
    pre {
      margin-top: 0.5em;
    }
  }
}
</style>
