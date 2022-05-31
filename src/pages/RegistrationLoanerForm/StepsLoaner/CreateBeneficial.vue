<template>
  <ContentWrapper>
    <Heading text="Внесите данные бенефициаров" />
    <div class="grid">
      <div class="inputs-container">
        <InputText
          title="Фамилия"
          v-model="state.beneficiaryLastName"
          :class="{ error: v$.beneficiaryLastName.$error }"
          :error="!!v$.beneficiaryLastName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Имя"
          v-model="state.beneficiaryFirstName"
          :class="{ error: v$.beneficiaryFirstName.$error }"
          :error="!!v$.beneficiaryFirstName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Отчество"
          v-model="state.beneficiaryPatronymic"
          :class="{ error: v$.beneficiaryPatronymic.$error }"
          :error="!!v$.beneficiaryPatronymic.$error"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
    </div>
    <ButtonsContainer>
      <Button
        class="btn-text"
        text="Назад"
        v-on:click="this.$emit('btnBack')"
      />
      <Button
        class="btn-text"
        type="submit"
        text="Далее"
        @click="submitForm"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper";
import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import ButtonsContainer from "../../../components/ButtonsContainer.vue";
import InputText from "../../../components/InputText";
import { createBeneficial } from "../../../api/borrower";
import { computed, reactive } from "vue";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { regexOnlyRus } from "@/utils/heplers";

export default {
  setup() {
    const state = reactive({
      beneficiaryLastName: "",
      beneficiaryFirstName: "",
      beneficiaryPatronymic: "",
      file: null,
      beneficiaryConfirmFiles: [],
      beneficiary: [],
    });
    const rules = computed(() => {
      return {
        beneficiaryLastName: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
          regexOnlyRus
        },
        beneficiaryFirstName: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
          regexOnlyRus
        },
        beneficiaryPatronymic: {
          minLength: minLength(3),
          $autoDirty: true,
          regexOnlyRus
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "CreateBeneficial",
  components: {
    ContentWrapper,
    Heading,
    Button,
    InputText,
    ButtonsContainer,
  },
  created() {
    let returnBeneficiary = JSON.parse(
      localStorage.getItem("this.beneficiary") || "[]"
    );
    this.state.beneficiary = returnBeneficiary;
  },
  mounted() {
    if (localStorage.beneficiaryLastName) {
      this.state.beneficiaryLastName = localStorage.beneficiaryLastName;
    }
    if (localStorage.beneficiaryFirstName) {
      this.state.beneficiaryFirstName = localStorage.beneficiaryFirstName;
    }
    if (localStorage.beneficiaryPatronymic) {
      this.state.beneficiaryPatronymic = localStorage.beneficiaryPatronymic;
    }
  },
  methods: {
    createBeneficial(data) {
      createBeneficial(data).then((res) => {
        localStorage.setItem('id_create_beneficial', res.id)
        console.log(res, "Test_create_beneficial");
        this.$emit("btnNext");
      });
    },
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      localStorage.founderFirstName = this.state.beneficiaryFirstName;
      localStorage.founderLastName = this.state.beneficiaryLastName;
      localStorage.founderPatronymic = this.state.beneficiaryPatronymic;
      const parsed = JSON.stringify(this.state.beneficiary);
      localStorage.setItem("this.beneficiary", parsed);
      if (isStepCorrect) {
        console.log("Form successfully submitted.");
        let data = {
          first_name: this.state.beneficiaryFirstName,
          last_name: this.state.beneficiaryLastName,
          patronymic: this.state.beneficiaryPatronymic,
        };
        this.createBeneficial(data);
      } else {
        console.log("Form failed validation");
      }
    },
    addFounder() {
      this.state.beneficiary.push(
        this.state.beneficiaryLastName +
        ` ` +
        this.state.beneficiaryFirstName +
        ` ` +
        this.state.beneficiaryPatronymic
      );
      // this.state.founderLastName = "";
      // this.state.founderFirstName = "";
      // this.state.founderPatronymic = "";
    },
    removeFounder(index) {
      this.state.beneficiary.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  display: grid;
  grid-template-columns: 0.9fr repeat(2, 1fr);
  grid-column-gap: 99px;
  width: 100%;
  max-height: 260px;
  @include bodyPadding;
  & > .inputs-container {
    @include gridInputsMargin;
  }
}

@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr 1.1fr;
    grid-row-gap: 60px;
    grid-column-gap: 60px;
    grid-template-rows: 260px 1fr;
    overflow: hidden;
    height: 100%;
    max-height: unset;
    margin-bottom: 60px;
    & > :nth-child(3) {
      grid-column: 1/3;
      height: 100%;
    }
  }
}

.inputFile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border-bottom: 1px solid $black-color;
  padding: 0 5px;
  position: relative;
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
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
  }
}

@media (max-width: $mobile) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr 1fr;
    grid-row-gap: 35px;
    overflow: auto;
    height: 100%;
    margin-bottom: 30px;
    padding-bottom: 13px;
    border-bottom: 1px solid #e6e2e2;
  }
}
</style>
