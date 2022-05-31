<template>
  <div class="content-wrapper" :class="{ small: small }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ContentWrapper",
  props: {
    small: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";

.content-wrapper {
  display: flex;
  flex-direction: column;
  background-color: $white-color;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 18px 40px 33px;
  margin: 0 auto;
  height: 506px;
  width: 100%;

  &.small {
    max-width: 452px;
    margin: 0 auto;
  }
}

@media (max-width: $mobile) {
  .content-wrapper {
    padding: 12px 20px 25px;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05),
      0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    &.small {
      min-height: 261px;
    }
  }
}
</style>
