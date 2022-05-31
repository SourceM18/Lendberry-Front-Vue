<template>
  <ContentWrapper small>
    <Heading center text="Внесите данные для регистрации" />
    <div class="inputs-container">
      <NewSelect :orgForms="orgForms" />
      <InputText
        v-show="this.$store.state.borrower.selected !== 'ИП'"
        title="Наименование"
        v-model="state.orgName"
        :class="{ error: v$.orgName.$error }"
        :error="!!v$.orgName.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        v-show="this.$store.state.borrower.selected === 'ИП'"
        title="Фамилия, имя, отчество"
        v-model="state.orgName"
        :class="{ error: v$.orgName.$error }"
        :error="!!v$.orgName.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Сокращенное наименование"
        v-model="state.shortName"
        :class="{ error: v$.shortName.$error }"
        :error="!!v$.shortName.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Адрес электронной почты"
        v-model="state.email"
        :class="{ error: v$.email.$error }"
        :error="!!v$.email.$error"
        error-text="Проверьте правильность введенных данных"
      />
      <InputText
        title="Бренд / маркетинговое наименование"
        v-model="state.brand"
        :class="{ error: v$.brand.$error }"
        :error="!!v$.brand.$error"
        error-text="Проверьте правильность введенных данных"
      />
    </div>
    <ButtonsContainer>
      <Button
        class="btn-text"
        text="Назад"
        v-on:click="this.$emit('btnBack')"
        @click="backToRegistration"
      />
      <Button
        class="btn-text"
        text="Далее"
        type="submit"
        @click="submitForm"
        :disabled="v$.$invalid"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import InputText from "../../../components/InputText.vue";
import Button from "../../../components/Button";
import ButtonsContainer from "../../../components/ButtonsContainer";
import NewSelect from "../../../components/NewSelect";

import { required, minLength, email } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { logout } from "../../../api/auth";

export default {
  setup() {
    const state = reactive({
      orgName: "",
      shortName: "",
      email: "",
      brand: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email, $autoDirty: true },
        orgName: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
        },
        shortName: { required, minLength: minLength(2), $autoDirty: true },
        brand: { minLength: minLength(2), $autoDirty: true },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },

  name: "Step1",
  components: {
    NewSelect,
    ContentWrapper,
    Heading,
    Button,
    InputText,
    ButtonsContainer,
  },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isOpen: false,
      error: false,
      orgForms: [
        { id: 1, name: "ЗАО" },
        { id: 2, name: "ООО" },
        { id: 3, name: "ОДО" },
        { id: 4, name: "АО" },
        { id: 5, name: "Полное товарищество" },
        { id: 6, name: "Производственный кооператив" },
        { id: 7, name: "ЧУП" },
        { id: 8, name: "ГУП" },
        { id: 9, name: "МУП" },
        { id: 10, name: "ОАО" },
        { id: 10, name: "ИП" },
      ],
    };
  },
  mounted() {
    if (localStorage.select) {
      this.selected = localStorage.select;
    }
    if (localStorage.name) {
      this.state.orgName = localStorage.name;
    }
    if (localStorage.shortName) {
      this.state.shortName = localStorage.shortName;
    }
    if (localStorage.email) {
      this.state.email = localStorage.email;
    }
    if (localStorage.brand) {
      this.state.brand = localStorage.brand;
    }
  },
  methods: {
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      if (isStepCorrect) {
        localStorage.select = this.selected;
        localStorage.name = this.state.orgName;
        localStorage.shortName = this.state.shortName;
        localStorage.email = this.state.email;
        localStorage.brand = this.state.brand;
        this.$emit("btnNext");
      } else {
        console.log("Form failed validation");
      }
    },
    logout(data) {
      logout(data).then((res) => {
        console.log(res, "TestLogout");
        localStorage.removeItem("SavedToken");
        this.$store.commit("SET_LOGGGED_IN", false);
        localStorage.removeItem("status");
      });
    },
    backToRegistration() {
      this.logout();
      this.$router.push({ name: "Login" });
    },
    selectItem(form) {
      this.selected = form.name;
    },
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    selected() {
      return this.$store.getters.GET_SELECTED;
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.inputs-container {
  @include gridInputsMargin;
  @include bodyPadding;
}

@media (max-width: $mobile) {
  .inputs-container {
    margin-bottom: 28px;
  }
}
</style>
