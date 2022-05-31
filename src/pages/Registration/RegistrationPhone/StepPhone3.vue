<template>
  <ContentWrapper small>
    <Heading center text="Создание учетной записи" />
    <div class="inputs-container">
      <InputPhone
        title="Введите номер мобильного телефона "
        v-model.trim="state.phone"
        :readonly="true"
        :class="{ error: v$.phone.$error }"
        :error="!!v$.phone.$error"
        error-text="Проверьте правильность введенного телефона"
      />
      <InputText
        type="email"
        title="Введите электронную почту "
        v-model.trim="state.email"
        :class="{ error: v$.email.$error }"
        :error="!!v$.email.$error"
        error-text="Проверьте правильность введенной электронной почты"
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
      <Button text="Назад" v-on:click="this.$emit('btnBack')" />
      <Button
        text="Далее"
        @click="registerByPhoneFireBase"
        :disabled="this.state.disable || v$.$invalid"
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
import InputPhone from "../../../components/InputPhone";
import { registerByPhone } from "../../../api/auth";
import { computed, reactive } from "vue";
import { alphaNum, email, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      disable: false,
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    const rules = computed(() => {
      return {
        phone: { required, minLength: minLength(10), $autoDirty: true },
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
    InputPhone,
  },
  mounted() {
    if (localStorage.userPhone) {
      this.state.phone = localStorage.userPhone;
    }
    if (localStorage.phoneLoginEmail) {
      this.state.phoneLoginEmail = localStorage.phoneLoginEmail;
    }
  },
  methods: {
    registerByPhone(data) {
      registerByPhone(data)
        .then((res) => {
          console.log(res.status);
          this.$router.push({ name: "PhoneCheckedVerification" });
        })
        .catch((error) => {
          alert(error.response.data.errors.phone.toString());
        });
    },
    async registerByPhoneFireBase() {
      if (this.state.password === this.state.password_confirmation) {
        let data = {
          phone: this.state.phone,
          password: this.state.password,
          id_token: localStorage.getItem("idToken"),
          type: localStorage.getItem("type"),
          email: this.state.email,
        };
        await this.registerByPhone(data);
      } else {
        alert("Проверьте совпадают ли пароли");
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
