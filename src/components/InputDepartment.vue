<template>
  <div class="input-container" :class="{ error: error }">
    <label class="title">{{ title }} </label>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-maska="'###-###'"
    />
    <error-message v-if="error === true" smallIco :errorText="errorText" />
  </div>
</template>

<script>
import ErrorMessage from "./ErrorMessage.vue";
import { maska } from "maska";
export default {
  components: { ErrorMessage },

  name: "InputDepartment",
  props: {
    title: String,
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    value: [String, Number],
    modelValue: { type: String || Number, default: null },
    error: Boolean,
    textError: String,
    errorText: {
      type: String,
      default: "Неверное значение",
    },
  },
  directives: { maska },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.input-container {
  display: block;
  height: 45px;
  border-bottom: 1px solid $black-color;
  & > .title {
    @include titleText;
    margin-bottom: 4px;
    display: block;
  }
  & > .input {
    border: none;
    font-family: inherit;
    @include text;
    padding: 5px;
    width: 100%;
  }
  &.error {
    position: relative;
    padding-right: 40px;
    & > .title,
    & > .input {
      color: $error-color;
    }
    & > .error-container {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
@media (max-width: $mobile) {
  .input-container {
    height: 32px;
    & > .title {
      margin-bottom: 0;
    }
    & > .input {
      padding: 0 5px;
    }
    &.error {
      padding-right: 25px;
    }
  }
  &.error {
    grid-template-columns: 1fr max-content;
    color: $error-color;
    & > .error-container {
      grid-column: 2/3;
      grid-row: 1/3;
      margin: 5px;
      align-self: flex-end;
    }
    & > .title,
    & > .input {
      color: $error-color;
    }
  }
}
</style>
