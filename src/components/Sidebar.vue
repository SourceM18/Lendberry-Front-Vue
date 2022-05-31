<template>
  <div class="sidebar-wrapper"></div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {},
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.sidebar-wrapper {
  height: 506px;
  width: 264px;
  box-shadow: 0px -4px 5px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px 20px 20px 0px;
  background-color: $white-color;
  padding: 66px 22px 22px;
  flex-shrink: 0;
}
@media (max-width: $mobile) {
}
</style>
