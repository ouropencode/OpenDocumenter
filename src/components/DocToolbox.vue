<template>
  <div class="toolbox">
    <DocToolboxDropdown v-if="serverOptions.length" :label="$i18n('SERVER')" v-model="currentServer" :options="serverOptions" :show-key="true" />
    <DocToolboxDropdown v-if="langOptions.length" :label="$i18n('LANGUAGE')" v-model="currentLang" :options="langOptions" />
    <div class="toolbox__spacer"></div>
    <DocToolboxDropdown :label="$i18n('DEFINITIONS')" v-model="showDefinition" :options="showDefOptions" />
    <DocToolboxIcon icon="cog" @click="openOptions" />
  </div>
</template>

<script>
import DocToolboxIcon from '@/components/DocToolboxIcon'
import DocToolboxDropdown from '@/components/DocToolboxDropdown'

export default {
  components: { DocToolboxIcon, DocToolboxDropdown },
  mounted() {
    if(!this.currentServer && this.serverOptions.length)
      this.currentServer = this.serverOptions[0].key
    if(!this.currentLang && this.langOptions.length)
      this.currentLang = this.langOptions[0].key
  },
  methods: {
    openOptions() {
      alert('No options currently available.')
    },
  },
  computed: {
    serverOptions() {
      const options = [];
      this.$api.servers.forEach(server => options.push({
        key:   server.url,
        value: server.description
      }));
      return options
    },
    langOptions() {
      return [
        {key: 'curl', value: 'cURL'},
        //{key: 'php',  value: 'PHP'},
      ]
    },
    showDefOptions() {
      return [
        {key: false, value: 'Hide'},
        {key: true,  value: 'Show'},
      ]
    },
    currentServer: {
      get() {
        return this.$store.getters.currentServer
      },
      set(value) {
        this.$store.commit('setServer', value)
      },
    },
    currentLang: {
      get() {
        return this.$store.getters.currentLang
      },
      set(value) {
        this.$store.commit('setLang', value)
      },
    },
    showDefinition: {
      get() {
        return this.$store.getters.showDefinition
      },
      set(value) {
        this.$store.commit('setShowDefinition', value)
      },
    },
  }
}
</script>

<style lang="less">
@import "@/assets/theme.less";

.toolbox {
  display: flex;
  background: @color-toolbox-background;
  color: @color-toolbox-text;
  justify-content: flex-end;

  &__spacer {
    flex: 1 1 auto;
  }
}
</style>
