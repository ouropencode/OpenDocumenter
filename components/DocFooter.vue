<template>
  <SplitSection class="footer" id="bottom">
    <a href="https://github.com/ouropencode/openapi-documenter" target="_blank" slot="side" class="footer__link">
      <div class="footer__love">
        <font-awesome-icon icon="heart" />
      </div>
      <div class="footer__credit">
        {{ $i18n('GENERATED_USING') }}
      </div>
    </a>
  </SplitSection>
</template>

<script>
import SplitSection from "~/components/SplitSection"

export default {
  components: { SplitSection }
}
</script>

<style lang="less">
@import "~/assets/theme.less";

.footer {
  &__link {
    position: relative;
    display: block;
    opacity: 0.7;
    color: @color-code-dark-text;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }
  }

  &__credit {
    padding: 3rem 0;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.8em;
    opacity: 0.4;
  }

  &__love {
    font-size: 3em;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.1;
    }
  }
}
</style>
