<template>
  <SplitSection class="header" id="top" :no-padding="true">
    <div class="header-split">
      <div class="header-split__left header__title">{{ $api.info.title }}</div>
      <div class="header-split__right header__shields">
        <shield v-for="(shield, idx) in shields" :key="idx"
          :url="shield.url"
          :left="shield.left"
          :right="shield.right"
          :translate="shield.translate"
          :color="shield.color"
          :href="shield.href"
          />
      </div>
    </div>

    <div class="header__subtitle">{{ $i18n('API_SDK_DOCUMENTATION') }}</div>

    <markdown v-if="$api.info.summary" class="header__summary" :content="$api.info.summary" />
    <markdown v-if="$api.info.description" class="header__description" :content="$api.info.description" />

    <ContactTeam v-if="$api.info.contact" />

    <div slot="side">
      <DocToolbox />
    </div>
  </SplitSection>
</template>

<script>
import SplitSection from "~/components/SplitSection"
import Markdown from "~/components/Markdown"
import DocToolbox from "~/components/DocToolbox"
import Shield from "~/components/Shield"
import ContactTeam from "~/components/ContactTeam"

export default {
  components: { SplitSection, Markdown, DocToolbox, Shield, ContactTeam },
  computed: {
    shields() {
      const shields = [
        { left: "VERSION", right: this.$api.info.version, translate: "left" },
      ]

      if(this.$api.info.license) {
        let license = this.$api.info.license
        shields.push({
          left: "LICENSE",
          right: license.identifier || license.name || "unknown",
          translate: "left",
          href: license.url,
        })
      }

      return [
        ...shields,
        ...(this.$config.shields || []),
      ]
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.header {
  .header-split {
    display: flex;
    &__left { flex: 0 0 auto; }
    &__right { flex: 1 1 auto; }
  }

  &__shields {
    color: @color-header-version;
    padding: 0.25rem 0 0 0;
    text-align: right;
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
