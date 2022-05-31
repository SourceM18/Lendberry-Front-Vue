<template>
  <button class="button-section" :class="{ error: false }">
    {{ text }} <error-message v-if="error" :errorText="errorText" />
  </button>
</template>

<script>
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "ButtonSection",

  components: { ErrorMessage },

  props: {
    text: String,
    error: Boolean,
  },

  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.button-section {
  font-family: inherit;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  @include textBig;
  color: $blue-color;
  text-align: center;
  height: 100%;
  text-decoration: none;
  background-color: $white-color;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  padding: 0 30px;
  position: relative;
  border: none;
  &:disabled {
    cursor: auto;
    color: $gray-color;
  }
  &:not(:disabled) {
    &:focus {
      font-weight: 700;
    }
  }
  &.error {
    color: $error-color;
  }

  @media (max-width: $mobile) {
    border-radius: 10px;
  }
}
</style>
