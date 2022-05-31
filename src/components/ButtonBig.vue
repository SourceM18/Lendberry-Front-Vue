<template>
  <button class="btn-big">{{ text }}</button>
</template>

<script>
export default {
  name: "ButtonBig",
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.btn-big {
  border: none;
  font-family: inherit;
  color: $white-color;
  cursor: pointer;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  @include textBig;
  text-align: center;
  height: 76px;
  background-color: $blue-color;
  width: 410px;

  @media (max-width: $tablet) {
    width: 100%;
  }
  @media (max-width: $mobile) {
    height: 42px;
    border-radius: 10px;
  }
}
</style>
