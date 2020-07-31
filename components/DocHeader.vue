<template>
  <SplitSection class="header" id="top" :no-padding="true">
    <div class="header__title">{{ $api.info.title }}</div>
    <div class="header__subtitle">{{ $i18n('API_SDK_DOCUMENTATION') }}</div>
    <div class="header__version">{{ $i18n('VERSION') }} {{ $api.info.version }}</div>
    <markdown class="header__intro" :content="$api.info.description" />

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
  &__title {
    .theme-font-title();
    padding: 1rem 0;
  }

  &__subtitle {
    .theme-font-subtitle();
    padding: 1rem 0;
  }

  &__version {
    color: @color-header-version;
    padding: 1rem 0;
  }

  &__intro {
    color: @color-header-intro;
    padding: 0;
    a { color: @color-header-intro; }
  }
}
</style>
