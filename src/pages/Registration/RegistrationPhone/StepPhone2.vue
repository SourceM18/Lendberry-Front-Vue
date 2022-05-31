<template>
  <ContentWrapper small>
    <Heading center text="Создание учетной записи" />
    <div class="inputs-container">
      <InputPhone
        title="Введите номер мобильного телефона"
        v-model.trim="this.state.phone"
        :class="{ error: v$.phone.$error }"
        :error="!!v$.phone.$error"
        error-text="Проверьте правильность ввода мобильного номера"
      />
      <InputText
        title="Введите смс-код"
        v-model.trim="this.state.sms"
        :maxlength="6"
        :class="{ error: v$.sms.$error }"
        :error="!!v$.sms.$error"
        error-text="Проверьте количество введенных символов"
      />
    </div>
    <ButtonsContainer>
      <Button text="Назад" v-on:click="this.$emit('btnBack')" />
      <Button text="Отправить смс повторно" @click="verifyOtp" />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import InputText from "@/components/InputText.vue";
import InputPhone from "@/components/inputPhone";
import { computed, reactive } from "vue";
import firebase from "firebase";
import { maxLength, minLength, numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      phone: "",
      sms: "",
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
          minLength: minLength(4),
          maxLength: maxLength(6),
          $autoDirty: true,
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Step4",
  components: {
    InputPhone,
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    InputText,
  },
  mounted() {
    if (localStorage.userPhone) {
      this.state.phone = localStorage.userPhone;
    }
  },
  methods: {
    async verifyOtp() {
      let code = this.state.sms;
      localStorage.sms = this.state.sms;
      await window.confirmationResult
        .confirm(code)
        .then(function (result) {
          let user = result.user;
          console.log(user, "user");
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(function (idToken) {
              console.log(idToken, "idToken");
              localStorage.setItem("idToken", idToken);
              // this.$store.commit("SET_TOKEN_ID", idToken);
            });
        })
        .catch(function (error) {
          console.log(error, "error");
        });
      this.$emit("btnNext");
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
</style>
