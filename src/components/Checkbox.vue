<template>
  <div class="checkbox">
    <input
      :id="id"
      type="checkbox"
      :value="value"
      name="checkbox-input"
      @change="$emit('input', value)"
    />
    <label :for="id">
      {{ title }}
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    title: {
      type: String,
      default: "",
    },
    id: String,
    value: String,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.checkbox {
  position: relative;
  user-select: none;
  height: 45px;
  display: flex;
  align-items: center;
  & > label {
    cursor: pointer;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    grid-column-gap: 12px;
    @include text;

    &::before {
      content: "";
      display: block;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid;
      border-color: $black-color;
    }
  }
  & > input:checked ~ label {
    &::before {
      background-color: $active-color;
      border-color: $active-color;
    }
  }
  & > input {
    width: 0px;
    height: 0px;
    opacity: 0;
    position: absolute;
  }
}
@media (max-width: $mobile) {
  .checkbox {
    height: 33px;
    & > label {
      &::before {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
