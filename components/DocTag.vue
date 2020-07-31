<template>
  <div class="doc-tag">
    <SplitSection>
      <div :id="$hashPath('', tag.name)" class="doc-tag__title">{{ tag.name }}</div>

      <div class="doc-tag__content">
        <markdown v-if="tag.description" :content="tag.description" />
        <p v-else>{{ $i18n('NO_INDEPTH_DOCS_AVAILABLE_TAG') }}</p>
      </div>
    </SplitSection>

    <div v-for="(pathDef, path) in tag.paths" :key="path">
      <div v-for="(methodDef, method) in pathDef" :key="method">
        <DocEntry :definition="methodDef" :show-definition="true" />
      </div>
    </div>
  </div>
</template>

<script>
import SplitSection from "~/components/SplitSection"
import Markdown from "~/components/Markdown"
import DocEntry from "~/components/DocEntry"

export default {
  props: ['tag'],
  components: { SplitSection, Markdown, DocEntry }
}
</script>

<style lang="less">
@import "~/assets/theme.less";
.doc-tag {
  &__title {
    .theme-font-tag-title();
    padding: 0.75em 0;
  }

  &__content {
  }
}
</style>
