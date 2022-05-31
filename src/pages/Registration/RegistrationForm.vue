<template>
  <Home
    v-if="this.$store.state.common.currentStepRegistration === 1"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step2
    v-if="this.$store.state.common.currentStepRegistration === 2"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step3
    v-if="this.$store.state.common.currentStepRegistration === 3"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <!--  <StepEmail v-if="registrationType === 'email'" />-->
  <!--  <RegistrationPhoneForm v-if="registrationType === 'phone'" />-->
</template>
<script>
import Step2 from "./Step2";
import Step3 from "./Step3";
import Home from "@/pages/Home";
// import StepEmail from "./RegistrationEmail/StepEmail";
// import RegistrationPhoneForm from "./RegistrationPhone/RegistrationPhoneForm";

export default {
  name: "RegistrationForm",
  components: { Home, Step3, Step2},
  props: {},
  data: function () {
    return {
      currentStepNumberRegistration: 1,
      registrationType: localStorage.getItem("registrationType"),
    };
  },
  methods: {
    goBack() {
      if (this.$store.state.common.currentStepRegistration > 1)
        this.$store.commit("decrementStepRegistration");
      console.log(this.$store.state.common.currentStepRegistration, "test1");
    },
    goNext() {
      if (this.$store.state.common.currentStepRegistration < 3)
        this.$store.commit("incrementStepRegistration");
      console.log(this.$store.state.common.currentStepRegistration, "test2");
    },
  },
};
</script>
