<template>
  <div class="toolbox-dropdown">
    <div class="toolbox-dropdown__label">
      {{ label }}:
    </div>

    <div class="toolbox-dropdown__value" @click="isOpen = !isOpen">
      <div>
        <span>{{ valueText }}</span>
        <font-awesome-icon icon="chevron-down" v-if="options.length > 1" />
      </div>

      <div class="toolbox-dropdown__options" v-show="isOpen" v-if="options.length > 1">
        <div class="toolbox-dropdown-option" v-for="opt in options" :key="opt.key" @click="$emit('input', opt.key)">
          {{ opt.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocToolboxDropdown from '~/components/DocToolboxDropdown'

export default {
  props: ['label', 'value', 'options'],
  components: { DocToolboxDropdown },
  computed: {
    valueText() {
      for(let opt of this.options) {
        if(opt.key == this.value)
          return opt.value
      }
      return this.value
    }
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="less">
@import "~/assets/theme.less";
@import "~/assets/utils.less";

.toolbox-dropdown {
  display: flex;
  align-items: center;

  &__label {
    flex: 0 0 auto;
    padding: 0.5em 0.5em 0.5em 1em;
    text-transform: uppercase;
    font-size: 0.8em;
    opacity: 0.8;
  }

  &__value {
    cursor: pointer;
    position: relative;
    flex: 0 0 auto;
    max-width: 15em;
    background: @color-toolbox-active-background;
    padding: 0.5em;
    font-size: 0.8em;
    > div {
      display: block;
      .truncated();
      span {
        padding-right: 0.25em;
      }
    }
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    padding: 0.25em;
    background: @color-toolbox-dropdown-background;
  }
}

.toolbox-dropdown-option {
  padding: 0.5em;
  color: @color-toolbox-link;
  .truncated();

  &:hover {
    color: @color-toolbox-link-hover;
  }
}
</style>
