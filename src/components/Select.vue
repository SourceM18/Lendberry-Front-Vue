<template>
  <div class="select-container">
    <p class="title" :class="{ active: isOpen }">{{ title }}</p>
    <div class="select-header" @click="toggleSelect">
      {{ selected }}<img class="ico" alt="" src="../assets/ico/Arrow_1.svg" />
    </div>
    <div :class="[isOpen ? 'open' : 'hide']">
      <ListContainer borderTopHide>
        <slot />
      </ListContainer>
    </div>
  </div>
</template>

<script>
import ListContainer from "./ListContainer.vue";
export default {
  components: { ListContainer },
  name: "Select",
  props: {
    orgForms: {
      type: Array,
      default() {
        return [];
      },
      selected: {
        type: String,
        default: "",
      },
    },
    title: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.select-container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 45px;
  & > .title {
    @include titleText;
    margin-bottom: 4px;
    &.active {
      color: $active-color;
    }
  }
  & > .select-header {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-column-gap: 10px;
    border-bottom: 1px solid $black-color;
    @include text;
    padding: 5px;
    cursor: pointer;
    & > .ico {
      width: 10px;
      height: auto;
    }
  }
  & > .hide {
    display: none;
  }
  & > .open {
    position: absolute;
    background-color: $white-color;
    width: 100%;
    height: 285px;
    top: 100%;
    z-index: 1;
  }
}
@media (max-width: $mobile) {
  .select-container {
    height: unset;
  }
}
</style>
