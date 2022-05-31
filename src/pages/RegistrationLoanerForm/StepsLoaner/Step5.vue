<template>
  <ContentWrapper small>
    <Heading center text="Внесите данные бухгалтера" />
    <div class="grid">
      <InputText
        title="Фамилия"
        v-model="state.accountantLastName"
        :class="{ error: v$.accountantLastName.$error }"
        :error="!!v$.accountantLastName.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Имя"
        v-model="state.accountantFirstName"
        :class="{ error: v$.accountantFirstName.$error }"
        :error="!!v$.accountantFirstName.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Отчество"
        v-model="state.accountantPatronymic"
        :class="{ error: v$.accountantPatronymic.$error }"
        :error="!!v$.accountantPatronymic.$error"
        error-text="Проверьте правильность введенных данных"
      />
    </div>
    <ButtonsContainer>
      <Button
        class="btn-text"
        text="Назад"
        v-on:click="this.$emit('btnBack')"
      />
      <Button
        class="btn-text"
        text="Далее"
        @click="submitForm"
        :disabled="v$.$invalid"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import Button from "../../../components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import InputText from "../../../components/InputText.vue";
import { createAccountant } from "../../../api/borrower";
import { computed, reactive } from "vue";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { regexOnlyRus } from "@/utils/heplers";

export default {
  setup() {
    const state = reactive({
      accountantLastName: "",
      accountantFirstName: "",
      accountantPatronymic: "",
    });
    const rules = computed(() => {
      return {
        accountantLastName: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
          regexOnlyRus
        },
        accountantFirstName: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
          regexOnlyRus
        },
        accountantPatronymic: {
          minLength: minLength(2),
          $autoDirty: true,
          regexOnlyRus
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Step5",
  components: {
    ContentWrapper,
    Heading,
    Button,
    InputText,
    ButtonsContainer,
  },
  mounted() {
    if (localStorage.accountantLastName) {
      this.state.accountantLastName = localStorage.accountantLastName;
    }
    if (localStorage.accountantFirstName) {
      this.state.accountantFirstName = localStorage.accountantFirstName;
    }
    if (localStorage.accountantPatronymic) {
      this.state.accountantPatronymic = localStorage.accountantPatronymic;
    }
  },
  methods: {
    createAccountant(data) {
      createAccountant(data).then((res) => {
        console.log(res, "TESTBorrower");
        this.$emit("btnNext");
      });
    },
    // keyInput(evt) {
    //   isRussianLang(evt)
    // },
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      localStorage.accountantFirstName = this.state.accountantFirstName;
      localStorage.accountantLastName = this.state.accountantLastName;
      localStorage.accountantPatronymic = this.state.accountantPatronymic;
      if (isStepCorrect) {
        console.log("Form successfully submitted.");
        let data = {
          first_name: this.state.accountantFirstName,
          last_name: this.state.accountantLastName,
          patronymic: this.state.accountantPatronymic,
        };
        this.createAccountant(data);
      } else {
        console.log("Form failed validation");
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
</style>
