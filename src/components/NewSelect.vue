<template>
  <div class="select-container">
    <p class="title" :class="{ active: isOpen }">
      Организационно-правовая форма
    </p>
    <div class="select-header" @click="toggleSelect">
      {{ selected }}
      <img class="ico" alt="" src="../assets/ico/Arrow_1.svg" />
    </div>
    <div :class="[isOpen ? 'open' : 'hide']">
      <ListContainer borderTopHide>
        <ListItem
          v-for="form in orgForms"
          :key="form.id"
          v-bind:text="form.name"
          @click="selectItem(form)"
        />
      </ListContainer>
    </div>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import ListItem from "./ListItem";

export default {
  name: "NewSelect",
  components: {
    ListContainer,
    ListItem,
  },
  props: {
    orgForms: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    selectItem(form) {
      this.selected = form.name;
      this.isOpen = !this.isOpen;
    },
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.borrower.selected;
      },
      set(value) {
        this.$store.commit("SET_SELECTED", value);
      },
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
    min-height: 27px;
    cursor: pointer;
    & > .ico {
      margin-left: auto;
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
    height: 290px;
    top: 100%;

    & .item {
      @include text;
      padding: 10px;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid #c4c4c4;
      }
    }
  }
}
</style>
