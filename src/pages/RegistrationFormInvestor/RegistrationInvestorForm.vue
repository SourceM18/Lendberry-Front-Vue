<template>
  <Step1
    v-if="this.$store.state.common.currentStep === 1"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step2
    v-if="this.$store.state.common.currentStep === 2"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step3
    v-if="this.$store.state.common.currentStep === 3"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step4
    v-if="this.$store.state.common.currentStep === 4"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
</template>

<script>
import Step1 from "./StepsLoaner/Step1";
import Step2 from "./StepsLoaner/Step2";
import Step3 from "./StepsLoaner/Step3";
import Step4 from "./StepsLoaner/Step4";
export default {
  name: "RegistrationLoanerForm",
  props: {},
  data: function () {
    return {
      currentStepNumber: 1,
    };
  },
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  watch: {},
  methods: {
    goBack() {
      if (this.$store.state.common.currentStep > 1)
        this.$store.commit("decrementStep");
      console.log(this.$store.state.common.currentStep, "test1");
    },
    goNext() {
      if (this.$store.state.common.currentStep < 4)
        this.$store.commit("incrementStep");
      console.log(this.$store.state.common.currentStep, "test2");
    },
  },
};
</script>
