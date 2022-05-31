<template>
  <div class="calendar-row">
    <span>{{ title }}</span>
    <button class="left">
      <img src="../assets/ico/Arrow_1.svg" @click="$emit('my-event')" />
    </button>
    <div class="data">{{ data }}</div>
    <button class="right">
      <img src="../assets/ico/Arrow_1.svg" @click="$emit('that-event')" />
    </button>
  </div>
</template>

<script>
export default {
  name: "CalendarRow",
  props: {
    title: String,
    data: String || Number,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.calendar-row {
  display: grid;
  grid-template-columns: 65px max-content 70px max-content;
  @include text;
  & > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0 5px;
  }
  & > .left {
    transform: rotate(90deg);
  }
  & > .right {
    transform: rotate(-90deg);
  }
  & > .data {
    color: $active-color;
    text-align: center;
  }
}
</style>
