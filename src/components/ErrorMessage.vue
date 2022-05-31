<template>
  <div class="error-container">
    <img
      class="ico"
      :class="smallIco ? 'small' : 'big'"
      src="../assets/ico/Mistake.svg"
    />
    <div v-if="errorText" class="error-message">
      <img src="../assets/ico/Mistake.svg" />
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    errorText: String,
    smallIco: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.error-container {
  cursor: pointer;
  & > .ico {
    &.small {
      width: 19px;
      height: auto;
    }
  }
  & > .error-message {
    display: none;
  }
  &:hover {
    z-index: 1;
    & > .error-message {
      display: flex;
      align-items: center;
      position: absolute;
      left: -200%;
      top: -200%;
      width: 342px;
      height: 114px;
      background-color: $white-color;
      box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05),
        0px 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      padding: 0 30px;
      font-size: 14px;
      line-height: 16px;
      color: $black-color;
      & > img {
        width: 38px;
        height: auto;
        margin-right: 25px;
      }
    }
  }
}
@media (max-width: $mobile) {
  .error-container {
    & > .ico,
    &.small {
      width: 14px;
      height: auto;
    }
    &:hover {
      & > .error-message {
        flex-direction: row-reverse;
        justify-content: space-between;
        left: -210px;
        top: -150%;
        width: 248px;
        height: 96px;
        border-radius: 15px;
        padding: 0 20px;
        font-size: 12px;
        line-height: 14px;

        & > img {
          width: 26px;
          margin-right: 0;
          margin-left: 18px;
        }
      }
    }
  }
}
</style>
