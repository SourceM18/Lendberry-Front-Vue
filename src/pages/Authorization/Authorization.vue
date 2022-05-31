<template>
  <div class="container-wrapper">
    <div class="inputs-container">
      <InputText
        title="Введите логин (номер телефона или email)"
        v-model.trim="state.login"
        :class="{ error: this.state.error }"
        :error="this.state.error"
        error-text="Введите правильный номер телефона или email"
      />
      <InputText
        title="Введите пароль"
        v-model.trim="state.password"
        :class="{ error: v$.password.$error }"
        :error="!!v$.password.$error"
        error-text="Пароль должен состоять из 8 символов, включая буквы и цифры"
        type="password"
      />
    </div>
    <ButtonsContainer>
      <Button text="Забыли пароль?" @click="onForget" />
      <Button
        text="Войти"
        @click="onLogin"
        :disabled="this.state.login === '' || this.state.password === ''"
      />
    </ButtonsContainer>
  </div>
</template>

<script>
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import InputText from "@/components/InputText";
import { loginByEmail, loginByPhone, logout } from "../../api/auth";
import { computed, reactive } from "vue";
import { alphaNum, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      login: "",
      password: "",
      type: "",
      error: false,
    });
    const rules = computed(() => {
      return {
        login: { required, $autoDirty: true },
        password: {
          required,
          minLength: minLength(8),
          alphaNum,
          $autoDirty: true,
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Authorization",
  components: {
    Button,
    ButtonsContainer,
    InputText,
  },
  data() {
    return {};
  },
  methods: {
    loginByEmail(data) {
      loginByEmail(data)
        .then((res) => {
          let token = res.token;
          console.log(token, "testToken");
          localStorage.setItem("SavedToken", token);
          this.$store.commit("LOGIN_SUCCESS", token);
          this.$store.commit("SET_LOGGGED_IN", true);
          localStorage.status = this.$store.state.auth.user.Logged_in;
          console.log(localStorage.status, "login");
          let type = localStorage.getItem("type");
          if (type === "borrower") {
            this.$router.push({ name: "RegistrationBorrower" });
          } else {
            this.$router.push({ name: "RegistrationInvestor" });
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert("Введите правильный логин или пароль");
        });
    },
    loginByPhone(data) {
      loginByPhone(data)
        .then((res) => {
          let token = res.token;
          localStorage.setItem("SavedToken", token);
          this.$store.commit("LOGIN_SUCCESS", token);
          this.$store.commit("SET_LOGGGED_IN", true);
          if (this.state.type === "borrower") {
            this.$router.push({ name: "RegistrationBorrower" });
          } else {
            this.$router.push({ name: "RegistrationInvestor" });
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert("Введите правильный логин или пароль");
          this.state.error = !this.state.error;
          setTimeout(() => {
            this.state.error = !this.state.error;
          }, 4000);
        });
    },
    validateEmail(email) {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    onLogin() {
      let emailData = {
        email: this.state.login,
        password: this.state.password,
      };
      let phoneData = {
        phone: this.state.login,
        password: this.state.password,
      };
      if (this.validateEmail(this.state.login)) {
        this.loginByEmail(emailData);
      } else {
        this.loginByPhone(phoneData);
      }
    },
    onForget() {
      this.$router.push({ name: "ForgetPassword" });
    },
    logout(data) {
      logout(data).then((res) => {
        console.log(res.status, "TestLogout");
      });
    },
  },
  mounted() {
    if (localStorage.type) {
      this.state.type = localStorage.type;
    }
  },
  created() {
    // if (this.$store.state.auth.user.Logged_in !== false) {
    this.logout();
    // }
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.container-wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.inputs-container {
  @include bodyPadding;
  @include gridInputsMargin;
}
</style>
