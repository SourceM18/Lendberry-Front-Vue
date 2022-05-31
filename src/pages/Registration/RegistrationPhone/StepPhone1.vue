<template>
  <ContentWrapper small>
    <Heading center text="Создание учетной записи" />
    <div class="inputs-container">
      <InputPhone
        title="Введите номер мобильного телефона"
        v-model.lazy="this.state.phone"
        :class="{ error: v$.phone.$error }"
        :error="!!v$.phone.$error"
        error-text="Проверьте правильность ввода мобильного телефона"
      />
      <InputText
        v-show="this.state.isShow === true"
        title="Введите смс-код"
        :maxlength="6"
        v-model.trim="this.state.sms"
        :class="{ error: v$.sms.$error }"
        :error="!!v$.sms.$error"
        error-text="Проверьте правильность ввода мобильного телефона"
      />
      <ButtonResend
        v-show="this.state.isShow === true"
        @click="onRepeatSend"
        :disabled="this.state.isDisable === true"
        :text="Countdown"
      />
      <!--        {{`Отправить еще раз через ${this.state.countDown} секунд`}}-->
      <div id="recaptcha-container"></div>
    </div>
    <ButtonsContainer>
      <Button text="Назад" @click="onBack" />
      <Button
        v-show="this.state.isShow === false"
        text="Отправить смс"
        @click="onSendOtp"
        :disabled="this.state.phone === ''"
      />
      <Button
        v-show="this.state.isShow === true"
        text="Подтвердить"
        @click="verifyOtp"
        :disabled="this.state.sms === '' || this.state.phone === ''"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonResend from "../../../components/ButtonResend";
import ButtonsContainer from "@/components/ButtonsContainer";
import InputText from "../../../components/InputText";
import InputPhone from "../../../components/InputPhone";
import { phoneNotExist } from "../../../api/auth";
import { computed, reactive } from "vue";
import firebase from "firebase";
import { maxLength, minLength, numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      phone: "",
      sms: "",
      appVerifier: "",
      isShow: false,
      isDisable: true,
      countDown: 60,
      type: localStorage.type,
    });
    const rules = computed(() => {
      return {
        phone: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
        },
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
  name: "Step3",
  components: {
    InputText,
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    ButtonResend,
    InputPhone,
  },
  methods: {
    phoneNotExist(data) {
      phoneNotExist(data)
        .then((res) => {
          console.log(res, "test,phoneNotExist");
          if (!!res === true) {
            this.onSend();
          } else {
            alert("Для указанного номера уже создан аккаунт");
            localStorage.removeItem("UserPhone");
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => {
          // console.log(error, "Forget Password");
          console.log(error.response, "phoneNotExist");
        });
    },
    onSendOtp() {
      let data = {
        phone: this.state.phone,
      };
      this.phoneNotExist(data);
    },
    onBack() {
      localStorage.removeItem("registrationType");
      if (this.state.type === "borrower") {
        this.$store.commit("GO_TO_CHOOSING_REGISTRATION_FORM");
        this.$router.push({ name: "registration" });
      } else {
        this.$store.commit("GO_TO_CHOOSING_PREV_REGISTRATION_FORM");
        this.$router.push({ name: "registration" });
      }
    },
    async onRepeatSend() {
      localStorage.userPhone = this.state.phone;
      let phoneNumber = this.state.phone;
      let appVerifier = this.state.appVerifier;
      await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          //
          console.log(confirmationResult, " confirm");
          // this.state.isShow = !this.state.isShow;
          alert("Смс отправлено на Ваш номер телефона");
          this.state.countDown = 60;
          this.countDownTimer();
          this.state.isDisable = !this.state.isDisable;
        })
        .catch(function (error) {
          // Error; SMS not sent
          console.log("error", error);
          // ...
          alert("Ошибка ! Смс не было отправлено");
          // this.state.isShow = !this.state.isShow;
        });
    },
    async onSend() {
      localStorage.userPhone = this.state.phone;
      let phoneNumber = this.state.phone;
      let appVerifier = this.state.appVerifier;
      await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          //
          console.log(confirmationResult, " confirm");
          // this.state.isShow = !this.state.isShow;
          alert("Смс отправлено на Ваш номер телефона");
          this.state.isShow = !this.state.isShow;
          this.countDownTimer();
          setTimeout(() => {
            this.state.isDisable = !this.state.isDisable;
          }, 60000);
        })
        .catch(function (error) {
          // Error; SMS not sent
          console.log("error", error);
          // ...
          alert("Ошибка ! Смс не было отправлено");
          // this.state.isShow = !this.state.isShow;
        });
    },
    async verifyOtp() {
      let code = this.state.sms;
      localStorage.sms = this.state.sms;
      await window.confirmationResult
        .confirm(code)
        .then((result) => {
          let user = result.user;
          console.log(user, "user");
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((idToken) => {
              console.log(idToken, "idToken");
              localStorage.setItem("idToken", idToken);
              // this.$store.commit("SET_TOKEN_ID", idToken);
              this.$emit("btnNext");
            });
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    },
    initReCaptcha() {
      setTimeout(() => {
        // eslint-disable-next-line no-unused-vars
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            // eslint-disable-next-line no-unused-vars
            callback: function (response) {},
            "expired-callback": function () {},
          }
        );
        this.state.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
    countDownTimer() {
      if (this.state.countDown > 0) {
        setTimeout(() => {
          this.state.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },
  created() {
    this.initReCaptcha();
  },
  computed: {
    Countdown() {
      return `Отправить еще раз через ${this.state.countDown} секунд`;
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped lang="scss">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.inputs-container {
  @include bodyPadding;
}
</style>
