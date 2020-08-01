<template>
  <div class="sidebar">
    <div>
      <DocSidebarTag :home="true" />
    </div>

    <div class="external-docs" v-if="$api.externalDocs">
      <DocSidebarTag v-if="$api.externalDocs.url" :link="$api.externalDocs.url" :text="$api.externalDocs.description || $i18n('EXTERNAL_DOCUMENTATION')" />
    </div>

    <div v-for="tag in $api.tags" :key="tag.name">
      <DocSidebarTag :tag="tag" />
    </div>

    <div class="additional-links">
      <div v-if="$api.info.termsOfService">
        <DocSidebarTag :link="$api.info.termsOfService" :text="$i18n('TERMS_OF_SERVICE')" />
      </div>

      <div v-if="$api.info.contact">
        <DocSidebarTag v-if="$api.info.contact.email" :link="$api.info.contact.email" :text="$i18n('SEND_US_AN_EMAIL')" />
        <DocSidebarTag v-if="$api.info.contact.url" :link="$api.info.contact.url" :text="$i18n('VISIT_OUR_WEBSITE')" />
      </div>
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
.additional-links {
  opacity: 0.5;
  padding: 1em 0;

}
</style>
