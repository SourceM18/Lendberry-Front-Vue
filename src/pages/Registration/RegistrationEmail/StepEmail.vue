<template>
  <ContentWrapper small>
    <Heading center text="Создание учетной записи" />
    <div class="inputs-container">
      <InputText
        type="email"
        title="Введите Ваш e-mail"
        v-model.lazy.trim="state.email"
        :class="{ error: v$.email.$error }"
        :error="!!v$.email.$error"
        error-text="Проверьте правильность ввода электронной почты"
      />
      <InputText
        title="Введите пароль"
        v-model.trim="state.password"
        type="password"
        :class="{ error: v$.password.$error }"
        :error="!!v$.password.$error"
        error-text="Пароль должен состоять из 8 символов, включая буквы и цифры"
      />
      <InputText
        title="Повторите пароль"
        v-model.trim="state.password_confirmation"
        type="password"
        :class="{ error: v$.password_confirmation.$error }"
        :error="!!v$.password_confirmation.$error"
        error-text="Проверьте правильность введенных данных"
      />
    </div>
    <ButtonsContainer>
      <Button text="Назад" @click="onBack" />
      <Button text="Далее" @click="register" :disabled="this.state.disable" />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import InputText from "@/components/InputText.vue";
import { registerByEmail } from "../../../api/auth";
import { computed, reactive } from "vue";
import { alphaNum, email, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      disable: false,
      showPassword: true,
      email: "",
      password: "",
      password_confirmation: "",
      isValid: false,
    });
    const rules = computed(() => {
      return {
        email: { required, email, $autoDirty: true },
        password: {
          required,
          minLength: minLength(8),
          alphaNum,
          $autoDirty: true,
        },
        password_confirmation: {
          required,
          minLength: minLength(8),
          alphaNum,
          $autoDirty: true,
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "StepEmail",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    InputText,
  },
  methods: {
    onBack() {
      localStorage.removeItem("registrationType");
      this.$store.commit("GO_TO_CHOOSING_REGISTRATION_FORM");
      this.$router.push({ name: "registration" });
    },
    registerByEmail(data) {
      if (this.state.password === this.state.password_confirmation) {
        registerByEmail(data)
          .then((res) => {
            alert(res.status);
            this.state.disable = !this.state.disable;
            this.$router.push({ name: "EmailCheckedVerification" });
          })
          .catch((error) => {
            // console.log(error.response.data.errors.email, "errorRegisterByEmail");
            alert(error.response.data.errors.email.toString());
            this.state.disable = !this.state.disable;
          });
      } else {
        alert("Проверьте совпадает ли пароль и его подтверждение.");
        this.state.disable = !this.state.disable;
      }
    },
    register: async function () {
      const isStepCorrect = await this.v$.$validate();
      if (isStepCorrect) {
        localStorage.setItem("userEmail", this.state.email);
        let data = {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          type: localStorage.getItem("type"),
        };
        console.log(data, "data");
        this.state.disable = !this.state.disable;
        this.registerByEmail(data);
      } else {
        alert("Пожалуйста проверьте правильность всех введенных данных");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.inputs-container {
  @include bodyPadding;
  @include gridInputsMargin;
}
@media (max-width: $mobile) {
  .inputs-container {
    margin-bottom: 28px;
  }
}
</style>
