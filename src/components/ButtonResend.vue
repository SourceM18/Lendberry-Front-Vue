<template>
  <button class="btn-text">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";

.btn-text {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 12px;
  line-height: 26px;
  color: $black-color;
  cursor: pointer;
  &:disabled {
    cursor: auto;
    color: $gray-color;
  }
  &:not(:disabled) {
    &:focus {
      color: $active-color;
    }
  }
}
@media (max-width: $mobile) {
  .btn-text {
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
