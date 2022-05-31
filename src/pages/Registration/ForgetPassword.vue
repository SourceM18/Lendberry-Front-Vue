<template>
  <ContentWrapper small>
    <Heading center text="Сброс пароля" />
    <div class="inputs-container">
      <InputText
        title="Введите Ваш телефон или e-mail"
        v-model.trim="state.login"
        :class="{ error: v$.login.$error }"
        :error="!!v$.login.$error"
        error-text="Проверьте правильность ввода электронной почты или номера телефона"
      />
      <InputText
        v-show="this.state.isShow === true"
        title="Введите смс-код"
        :maxlength = "6"
        v-model.trim="this.state.sms"
        :class="{ error: v$.sms.$error }"
        :error="!!v$.sms.$error"
        error-text="Проверьте правильность ввода мобильного телефона"
      />
    </div>
    <ButtonsContainer>
      <Button text="Назад" @click="backToAuth" />
      <Button
        v-show="this.state.isShow === false"
        text="Сбросить пароль"
        @click="ResetPassword"
      />
      <Button
        v-show="this.state.isShow === true"
        text="Отправить смс повторно"
        @click="verifySMS"
      />
    </ButtonsContainer>
    <div id="recaptcha-container-Resend" />
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import InputText from "@/components/InputText.vue";

import { computed, reactive } from "vue";
import { maxLength, minLength, numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import { forgetPassword } from "../../api/auth";
import firebase from "firebase";

export default {
  setup() {
    const state = reactive({
      disable: false,
      login: "",
      sms: "",
      appVerifier: "",
      isShow: false,
    });
    const rules = computed(() => {
      return {
        login: { required, $autoDirty: true },
        sms: {
          required,
          numeric,
          minLength: minLength(6),
          maxLength: maxLength(6),
          $autoDirty: true,
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "forgetPassword",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    InputText,
  },
  mounted() {
    if (localStorage.forgetEmail) {
      this.state.email = localStorage.forgetEmail;
    }
  },
  methods: {
    forgetPassword(data) {
      forgetPassword(data)
        .then((res) => {
          alert(res.status);
          this.state.disable = !this.state.disable;
          localStorage.forgetEmail = this.state.login;
          this.$router.push({ name: "ResetPassword" });
        })
        .catch((error) => {
          console.log(error, "Forget Password");
          this.state.disable = !this.state.disable;
          alert("Такое значение поля E-Mail адрес не существует.");
        });
    },
    validateEmail(email) {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    async onSend() {
      let phoneNumber = this.state.login;
      let appVerifier = this.state.appVerifier;
      await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          //
          console.log(confirmationResult, " confirm");
          alert("Смс отправлено на Ваш номер телефона");
        })
        .catch(function (error) {
          // Error; SMS not sent
          console.log("error", error);
          // ...
          alert("Ошибка ! Смс не было отправлено");
        });
      this.state.isShow = !this.state.isShow;
    },
    async verifySMS() {
      let code = this.state.sms;
      // console.log(code)
      // localStorage.sms = this.state.sms;
      // this.$router.push({ name: "RestorePasswordPhone" });
      await window.confirmationResult
        .confirm(code)
        .then(function (result) {
          let user = result.user;
          console.log(user, "user");
        })
        .catch(function (error) {
          console.log(error, "error");
          // this.$router.push({ name: "RestorePasswordPhone" });
        });
      await this.$router.push({ name: "RestorePasswordPhone"});
    },
    initReCaptcha() {
      setTimeout(() => {
        // eslint-disable-next-line no-unused-vars
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container-Resend",
          {
            size: "invisible",
            // eslint-disable-next-line no-unused-vars
            callback: function (response) {},
            "expired-callback": function () {},
          }
        );
        this.state.appVerifier = window.recaptchaVerifier;
      }, 3000);
    },
    backToAuth() {
      this.$router.push({ name: "Login" });
    },
    ResetPassword: async function () {
      // const isStepCorrect = await this.v$.$validate();
      // if (isStepCorrect) {
      if (this.validateEmail(this.state.login)) {
        let data = {
          email: this.state.login,
        };
        this.state.disable = !this.state.disable;
        this.forgetPassword(data);
      } else {
        await this.onSend();
      }
      // } else {
      //   alert("Пожалуйста проверьте правильность заполнения данных");
      // }
    },
  },
  created() {
    this.initReCaptcha();
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
