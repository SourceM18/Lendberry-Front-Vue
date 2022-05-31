<template>
  <div class="radio-button-group">
    <label :for="option" v-for="option in options" :key="option">
      <input
        type="radio"
        name="radio-input"
        :value="option"
        :id="option"
        @change="$emit('input', option)"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseRadioButtonGroup",
  props: {
    options: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style>
.radio-button-group {
  width: 60%;
  margin: 20px auto;
  padding: 15px 20px;
  border: 1px solid black;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
}
</style>
