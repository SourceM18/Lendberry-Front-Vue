<template>
  <div
    class="list-item"
    :class="{ addItem: addItem, delItem: delItem, bigText: bigText }"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  components: {},
  name: "ListItem",
  props: {
    text: String,
    addItem: Boolean,
    delItem: Boolean,
    bigText: Boolean,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.list-item {
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  padding: 0 15px;
  height: 37px;
  border-bottom: 1px solid #c4c4c4;
  cursor: pointer;
  font-size: 14px;
  line-height: 16px;
  overflow: hidden;
  &.addItem,
  &.delItem {
    &::before {
      content: "";
      display: inline-block;
      background-size: auto 100%;
      background-repeat: no-repeat;
      margin-right: 10px;
      width: 17px;
      height: 17px;
    }
  }
  &.addItem {
    &::before {
      background-image: url(../assets/ico/Add.svg);
    }
  }
  &.delItem {
    &::before {
      background-image: url(../assets/ico/Backet.svg);
    }
  }
}
@media (max-width: $tablet) {
  .list-item {
    font-size: 12px;
    line-height: 14px;
  }
}
@media (max-width: $mobile) {
  .list-item {
    padding: 0 8px;
    height: 22px;
    font-size: 8px;
    line-height: 9px;
    &.addItem,
    &.delItem {
      &::before {
        width: 11px;
        height: 11px;
      }
    }
    &.bigText {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
