<template>
  <StepPhone1 v-if="this.currentStepPhone === 1" v-on:btnNext="goNext" />
  <StepPhone3
    v-if="this.currentStepPhone === 2"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
</template>
<script>
import StepPhone1 from "./StepPhone1";
import StepPhone3 from "./StepPhone3";

export default {
  name: "RegistrationPhoneForm",
  components: { StepPhone3, StepPhone1 },
  props: {},
  data: function () {
    return {
      currentStepPhone: 1,
    };
  },
  methods: {
    goBack() {
      if (this.currentStepPhone > 1) this.currentStepPhone--;
    },
    goNext() {
      if (this.currentStepPhone < 2) this.currentStepPhone++;
    },
  },
};
</script>
