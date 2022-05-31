<template>
  <Step1
    v-if="this.$store.state.common.currentStep === 1"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
    :form="form"
  />
  <Step2
    v-if="this.$store.state.common.currentStep === 2"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Logo
    v-if="this.$store.state.common.currentStep === 3"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step3
    v-if="this.$store.state.common.currentStep === 4"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
    v-on:btnNextIp="goNextIp"
  />
  <CreateLeader
    v-if="this.$store.state.common.currentStep === 5"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <UploadFilesLeader
    v-if="this.$store.state.common.currentStep === 6"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <CreateBeneficial
    v-if="this.$store.state.common.currentStep === 7"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <UploadFilesBeneficial
    v-if="this.$store.state.common.currentStep === 8"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step5
    v-if="this.$store.state.common.currentStep === 9"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step6
    v-if="this.$store.state.common.currentStep === 10"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step7
    v-if="this.$store.state.common.currentStep === 11"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
    v-on:btnBackIp="goBackIp"
  />
  <Step8
    v-if="this.$store.state.common.currentStep === 12"
    v-on:btnBack="goBack"
    v-on:btnNext="goNext"
  />
  <Step9 v-if="this.$store.state.common.currentStep === 13" />
</template>

<script>
import Step1 from "./StepsLoaner/Step1";
import Step2 from "./StepsLoaner/Step2";
import Step3 from "./StepsLoaner/Step3";
import CreateLeader from "./StepsLoaner/CreateLeader";
import Step5 from "./StepsLoaner/Step5";
import Step6 from "./StepsLoaner/Step6";
import Step7 from "./StepsLoaner/Step7";
import Step8 from "./StepsLoaner/Step8";
import Step9 from "./StepsLoaner/Step9";
import CreateBeneficial from "./StepsLoaner/CreateBeneficial";
import UploadFilesBeneficial from "./StepsLoaner/UploadFilesBeneficial";
import Logo from "./StepsLoaner/logo";
import UploadFilesLeader from "@/pages/RegistrationLoanerForm/StepsLoaner/UploadFilesLeader";
export default {
  name: "RegistrationLoanerForm",
  props: {},
  data: function () {
    return {
      currentStepNumber: 1,
      form: {},
    };
  },
  components: {
    UploadFilesLeader,
    Logo,
    Step1,
    Step2,
    Step3,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,
    CreateLeader,
    CreateBeneficial,
    UploadFilesBeneficial
  },
  watch: {},
  methods: {
    goBack() {
      if (this.$store.state.common.currentStep > 1)
        this.$store.commit("decrementStep");
      console.log(this.$store.state.common.currentStep, "test1");
    },
    goNext() {
      if (this.$store.state.common.currentStep < 11)
        this.$store.commit("incrementStep");
      console.log(this.$store.state.common.currentStep, "test2");
    },
    goNextIp() {
      if (this.$store.state.borrower.selected === "ИП")
        this.$store.commit("incrementStepIp");
    },
    goBackIp() {
      if (this.$store.state.borrower.selected === "ИП")
        this.$store.commit("decrementStepIp");
    },
  },
};
</script>
