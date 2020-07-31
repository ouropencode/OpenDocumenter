<template>
  <SplitSection class="entry">
    <DocEntryTitle :title="definition.summary" :path="definition.path" :method="definition.method" />

    <Markdown v-if="definition.description" :content="definition.description" />
    <p v-else>{{ $i18n('NO_INDEPTH_DOCS_AVAILABLE_ENDPOINT') }}</p>

    <div v-if="definition.requestBody">
      <div class="entry-subtitle">{{ $i18n('REQUEST_BODY') }}</div>
      <ReqBody :body="definition.requestBody" />
    </div>

    <div v-if="Object.keys(definition.responses).length > 0">
      <div class="entry-subtitle">{{ $i18n('REQUEST_RESPONSES') }}</div>
      <div v-for="(resp, code) in definition.responses" :key="code">
        <ReqResponse :response="resp" :code="code" />
      </div>
    </div>

    <div slot="side">
      <Example title="Example Request" :lang="currentLang" :content="exampleRequest" />"
      <Example v-if="exampleResponse" title="Example Response" lang="json" :content='exampleResponse' />
      <Example v-if="showDefinition" :title="$i18n('DEFINITION')" lang="json" :content="definition" />
    </div>
  </SplitSection>
</template>

<script>
import Vuex from 'vuex'

import SplitSection from "~/components/SplitSection"
import Markdown from "~/components/Markdown"
import DocEntryTitle from "~/components/DocEntryTitle"
import Example from "~/components/Example"
import ReqBody from "~/components/ReqBody"
import ReqResponse from "~/components/ReqResponse"

export default {
  props: ['definition', 'show-definition'],
  components: { SplitSection, Markdown, DocEntryTitle, Example, ReqBody, ReqResponse },
  computed: {
    exampleRequest() {
      return this.$codegen(this.currentLang, this.definition)
    },
    exampleResponse() {
      let resp = this.definition.responses['200']
      if(!resp) resp = this.definition.responses['default']
      if(!resp) return undefined

      if(!resp.content || !resp.content['application/json'])
        return undefined

      return resp.content['application/json'].example
    },
    ...Vuex.mapGetters(['currentServer', 'currentLang', 'showDefinition'])
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.entry {
  .split-section__main {
    padding-bottom: 3em;
  }

  .entry-subtitle {
    .theme-font-entry-subtitle();
    padding-bottom: 1em;
  }

  .markdown {
    padding-bottom: 1em;
  }
}
</style>
