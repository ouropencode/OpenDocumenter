<template>
  <SplitSection class="header" id="top" :no-padding="true">
    <div class="header__version">{{ $i18n('VERSION') }} {{ $api.info.version }}</div>
    <div class="header__title">{{ $api.info.title }}</div>
    <div class="header__subtitle">{{ $i18n('API_SDK_DOCUMENTATION') }}</div>

    <markdown v-if="$api.info.summary" class="header__summary" :content="$api.info.summary" />
    <markdown v-if="$api.info.description" class="header__description" :content="$api.info.description" />

    <div slot="side">
      <DocToolbox />
    </div>
  </SplitSection>
</template>

<script>
import SplitSection from "~/components/SplitSection"
import Markdown from "~/components/Markdown"
import DocToolbox from "~/components/DocToolbox"

export default {
  components: { SplitSection, Markdown, DocToolbox }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.header {
  &__version {
    color: @color-header-version;
    padding: 1rem 0;
    float: right;
  }

  &__title {
    .theme-font-title();
    padding: 0 0 1.6rem 0;
  }

  &__subtitle {
    .theme-font-subtitle();
    padding: 1.5rem 0 1.25rem 0;
  }

  &__summary {
    p { .theme-font-summary(); }
  }
}
</style>
