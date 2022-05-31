<template>
  <div class="list-container" :class="{ borderTopHide: borderTopHide }">
    <perfect-scrollbar>
      <slot />
    </perfect-scrollbar>
  </div>
</template>

<script>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "@/styles/vue3-perfect-scrollbar.css";

export default {
  name: "ListContainer",
  components: {
    PerfectScrollbar,
  },
  props: {
    borderTopHide: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.list-container {
  border-top: 1px solid $black-color;
  border-bottom: 1px solid $black-color;
  background-color: $white-color;
  position: relative;
  z-index: 1;
  height: 100%;

  &.borderTopHide {
    border-top: none;
  }
  .ps {
    height: 100%;
    width: calc(100% + 20px);
    padding-right: 20px;
    position: absolute;
  }
}
</style>
