<template>
  <div class="page-heading-wrapper" :class="{ 'page-heading-wrapper-btn': isDownload || isFaq}">
    <h2 class="page-heading" :class="{ 'center-position': center }">
      {{ text }}
    </h2>
    <Download v-if="isDownload"/>
    <FAQ v-if="isFaq"/>
  </div>
</template>

<script>
import Download from "@/components/Download";
import FAQ from "@/components/Faq";
export default {
  name: "Heading",
  components: { FAQ, Download },
  props: {
    text: String,
    center: Boolean,
    isFaq: Boolean,
    isDownload: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.page-heading {
  @include textBig;
  color: $active-color;
  @media (max-width: $tablet) {
    .page-heading {
      text-align: center;
    }
  }
  &.center-position {
    text-align: center;
    margin-left: -20px;
    margin-right: -20px;
  }
  &-wrapper {
    margin-bottom: 30px;
    @media (max-width: $tablet) {
        margin-bottom: 20px;
    }

    &-btn{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
