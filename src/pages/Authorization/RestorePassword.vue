<template>
  <ContentWrapper small>
    <Heading center text="Сохранение нового пароля" />
    <div class="inputs-container">
      <InputText
        title="Введите ваш e-mail"
        v-model.trim="state.email"
        :class="{ error: v$.email.$error }"
        :error="!!v$.email.$error"
        error-text="Проверьте правильность ввода электронной почты"
      />
      <InputText
        title="Введите новый пароль"
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
      <Button text="Назад" />
      <Button
        text="Сохранить"
        @click="onUpdatePassword"
        :disabled="this.state.disable"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import InputText from "@/components/InputText.vue";
import { updatePasswordByEmail } from "../../api/auth";
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
        email: { required, email, minLength: minLength(2), $autoDirty: true },
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
  name: "RestorePassword",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    InputText,
  },
  methods: {
    updatePasswordByEmail(data) {
      updatePasswordByEmail(data)
        .then((res) => {
          console.log(res.status, "testUpdatePassword");
        })
        .catch((error) => {
          console.log(error, "errorUpdatePassword");
          if (this.state.password !== this.state.password_confirmation) {
            alert("Проверьте правильность введенного пароля.");
          } else {
            alert("Проверьте правильно ли введены email или номер телефона.");
          }
        });
    },
    onUpdatePassword() {
      let emailData = {
        email: this.state.email,
        password: this.state.password,
      };
      this.updatePasswordByEmail(emailData);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

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
