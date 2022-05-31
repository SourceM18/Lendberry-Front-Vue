<template>
  <div class="input-container">
    <label class="title"><img src="../assets/ico/Find.svg" /></label>
    <input
      class="input"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Поиск"
    />
  </div>
</template>

<script>
export default {
  name: "InputSearch",
  props: {
    title: String,
    value: [String, Number],
    modelValue: { type: String || Number, default: null },
    error: Boolean,
    textError: String,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.input-container {
  display: flex;
  align-items: center;
  padding-left: 20px;

  & > .input {
    border: none;
    font-family: inherit;
    @include text;
    padding: 5px 5px 5px 10px;
    &::placeholder {
      @include titleText;
    }
  }
}
@media (max-width: $mobile) {
  .input-container {
    padding-left: 8px;
    & > .title {
      & > img {
        width: 12px;
        height: auto;
      }
    }
  }
}
</style>
