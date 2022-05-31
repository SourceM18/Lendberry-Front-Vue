<template>
  <ContentWrapper small>
    <Heading center text="Внесите банковские данные" />
    <div class="grid">
      <InputText
        title="Расчетный счет"
        v-model="state.checkingAccount"
        :class="{ error: v$.checkingAccount.$error }"
        :error="!!v$.checkingAccount.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Наименование банка"
        v-model="state.bankName"
        :class="{ error: v$.bankName.$error }"
        :error="!!v$.bankName.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Корреспондентский счет"
        v-model="state.correspondentAccount"
        :class="{ error: v$.correspondentAccount.$error }"
        :error="!!v$.correspondentAccount.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="БИК банка"
        v-model="state.bik"
        :class="{ error: v$.bik.$error }"
        :error="!!v$.bik.$error"
        error-text="Проверьте правильность введенных данных"
      />
    </div>
    <ButtonsContainer>
      <Button text="Назад" @click="backToIp" />
      <Button text="Далее" @click="submitForm" :disabled="v$.$invalid" />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import InputText from "../../../components/InputText.vue";
import Button from "../../../components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";

import { computed, reactive } from "vue";
import { minLength, required, maxLength, numeric } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      checkingAccount: "",
      bankName: "",
      correspondentAccount: "",
      bik: "",
    });
    const rules = computed(() => {
      return {
        checkingAccount: {
          required,
          numeric,
          maxLength: maxLength(20),
          $autoDirty: true,
        },
        bankName: { required, $autoDirty: true },
        correspondentAccount: {
          required,
          numeric,
          maxLength: maxLength(20),
          $autoDirty: true,
        },
        bik: { required, numeric, maxLength: minLength(9), $autoDirty: true },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Step7",
  components: {
    ContentWrapper,
    Heading,
    Button,
    InputText,
    ButtonsContainer,
  },
  mounted() {
    if (localStorage.bankName) {
      this.state.bankName = localStorage.bankName;
    }
    if (localStorage.bik) {
      this.state.bik = localStorage.bik;
    }
    if (localStorage.correspondentAccount) {
      this.state.correspondentAccount = localStorage.correspondentAccount;
    }
    if (localStorage.checkingAccount) {
      this.state.checkingAccount = localStorage.checkingAccount;
    }
  },
  computed: {
    selected() {
      return this.$store.getters.GET_SELECTED;
    },
  },
  methods: {
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      localStorage.checkingAccount = this.state.checkingAccount;
      localStorage.correspondentAccount = this.state.correspondentAccount;
      localStorage.bik = this.state.bik;
      localStorage.bankName = this.state.bankName;
      if (isStepCorrect) {
        console.log("Form successfully submitted.");
        this.$emit("btnNext");
      } else {
        console.log("Form failed validation");
      }
    },
    backToIp() {
      if (this.$store.state.selected === "ИП") {
        this.$emit("btnBackIp");
      } else {
        this.$emit("btnBack");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  @include gridInputsMargin;
  @include bodyPadding;
}
@media (max-width: $mobile) {
  .grid {
    margin-bottom: 47px;
  }
}
</style>
