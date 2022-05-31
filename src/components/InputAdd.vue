<template>
  <div class="input-container" errorFile :class="{ flexStart: flexStart }">
    <label :for="id" class="title"
      ><img v-if="errorFile" src="../assets/ico/Backet.svg" />
      <img v-else src="../assets/ico/Add.svg" /> {{ title }}</label
    >
    <input
      :id="id"
      class="input"
      :value="value"
      :type="type"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
export default {
  name: "InputAdd",
  props: {
    title: String,
    id: String,
    type: String,
    flexStart: Boolean,
    errorFile: Boolean,
    // modelValue: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    value: File,
  },
  methods: {
    handleFileChange(e) {
      this.$emit("input", e.target.files[0]);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border-bottom: 1px solid $black-color;
  padding: 0 5px;
  position: relative;
  &.flexStart {
    justify-content: flex-start;
    height: 35px;
  }
  & > .title {
    @include text;
    cursor: pointer;
    display: flex;
    align-items: center;
    & > img {
      margin-right: 10px;
    }
  }
  & > .input {
    width: 0px;
    height: 0px;
    position: absolute;
    opacity: 0;
  }
}
</style>
