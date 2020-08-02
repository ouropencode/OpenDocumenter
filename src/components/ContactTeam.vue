<template>
  <div class="contact-team">
    {{ $i18n("HAVE_ANY_QUESTIONS_CONTACT") }}
    <span v-if="email && url">
      {{ name }} <a :href="'mailto:' + email">{{ $i18n("VIA_EMAIL") }}</a> {{ $i18n("OR") }} <a :href="url">{{ $i18n("VIA_OUR_WEBSITE") }}</a>.
    </span>
    <span v-else-if="email">
      {{ name }} <a :href="'mailto:' + email">{{ $i18n("VIA_EMAIL") }}</a>.
    </span>
    <span v-else-if="url">
      {{ name }} <a :href="'mailto:' + url">{{ $i18n("VIA_OUR_WEBSITE") }}</a>.
    </span>
    <span v-else>
      {{ name }}.
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:  this.$api.info.contact.name || "us",
      email: this.$api.info.contact.email,
      url:   this.$api.info.contact.url
    }
  }
}
</script>

<style lang="less">
@import "@/assets/theme.less";

.contact-team {
  padding-top: 1rem;
  color: @color-help-text;
  a { color: @color-help-text; }
}
</style>
