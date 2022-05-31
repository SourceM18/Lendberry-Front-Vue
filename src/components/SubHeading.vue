<template>
  <h3 class="page-heading">
    {{ text }}
  </h3>
</template>

<script>
export default {
  name: "SubHeading",
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";

.page-heading {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: $active-color;
  margin-bottom: 24px;
}
@media (max-width: $mobile) {
  .page-heading {
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 15px;
  }
}
</style>
