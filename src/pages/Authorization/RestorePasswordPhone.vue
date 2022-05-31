<template>
  <ContentWrapper small>
    <Heading center text="Сохранение нового пароля" />
    <div class="inputs-container">
      <InputText
        title="Введите ваш номер телефона"
        :maxlength="12"
        v-model.trim="state.login"
        :class="{ error: v$.login.$error }"
        :error="!!v$.login.$error"
        error-text="Проверьте правильность ввода номера телефона"
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
import { updatePasswordByPhone } from "../../api/auth";
import { computed, reactive } from "vue";
import { alphaNum, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      disable: false,
      showPassword: true,
      login: "",
      password: "",
      password_confirmation: "",
      isValid: false,
    });
    const rules = computed(() => {
      return {
        login: { required, minLength: minLength(2), $autoDirty: true },
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
    updatePasswordByPhone(data) {
      updatePasswordByPhone(data)
        .then((res) => {
          console.log(res.status, "testUpdatePassword");
        })
        .catch((error) => {
          console.log(error, "errorUpdatePassword");
          if (this.state.password !== this.state.password_confirmation) {
            alert("Проверьте правильность введенного пароля.");
          } else {
            alert("Проверьте правильно ли введен номер телефона.");
          }
        });
    },
    onUpdatePassword() {
      let phoneData = {
        phone: this.state.login,
        password: this.state.password,
      };
      this.updatePasswordByPhone(phoneData);
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
