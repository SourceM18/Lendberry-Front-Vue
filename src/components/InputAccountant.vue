<template>
  <div class="inputAccountant" :class="{ error: error }">
    <p class="title">{{ title }}</p>
    <div class="input-container" :class="{ flexStart: flexStart }">
      <label
        v-if="seen === true"
        id="input"
        class="title"
        v-on:click="addFiles()"
      >
        <img src="../assets/ico/Add.svg" />
        Добавить файл
      </label>
      <label v-else id="input" class="title" v-on:click="addFiles()">
        <img src="../assets/ico/Backet.svg" />
        <span v-for="(file, index) in files" :key="index">
          {{ file.name }}</span
        >
      </label>
      <input
        class="input"
        type="file"
        ref="input_file"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <ErrorMessage smallIco v-if="error" :errorText="errorText" />
    </div>
  </div>
</template>

<script>
import ErrorMessage from "./ErrorMessage.vue";

export default {
  name: "InputAccountant",
  components: {
    ErrorMessage,
  },
  props: {
    title: String,
    flexStart: Boolean,
    errorFile: Boolean,
    errorText: {
      type: String,
      default: "Некорректный формат файла",
    },
    value: [],
    modelValue: { type: [], default: null },
  },
  data() {
    return {
      error: false,
      seen: true,
    };
  },
  methods: {
    addFiles() {
      this.$refs.input_file.click();
      this.seen = !this.seen;
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.inputAccountant {
  height: 45px;
  & > .input-container {
    height: 30px;
  }
  & > .title {
    @include titleText;
  }
  &.error {
    position: relative;
    color: $error-color;
    & > .input-container {
      padding-right: 40px;
    }
    & > .title {
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
