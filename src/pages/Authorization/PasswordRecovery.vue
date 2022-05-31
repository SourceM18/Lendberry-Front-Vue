<template>
  <ContentWrapper small>
    <Heading center text="Востановление пароля" />
    <div class="inputs-container">
      <div class="text-mail">
        Пароль отправлен на почту:
        <span>{{ this.email }}</span>
      </div>
    </div>
    <ButtonsContainer>
      <Button text="Отправить повторно" @click="sendPassword" />
      <Button text="Ввести" @click="EnterPassword" />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import { forgetPassword } from "../../api/auth";

export default {
  name: "PasswordRecovery",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
  },
  data() {
    return {
      email: "",
    };
  },
  mounted() {
    if (localStorage.forgetEmail) {
      this.email = localStorage.forgetEmail;
    }
  },
  methods: {
    forgetPassword(data) {
      forgetPassword(data)
        .then((res) => {
          alert(res.status);
        })
        .catch((error) => {
          console.log(error, "Forget Password");
          alert("Такое значение поля E-Mail адрес не существует.");
        });
    },

    sendPassword() {
      let data = {
        email: this.email,
      };
      this.forgetPassword(data);
    },
    EnterPassword() {
      localStorage.removeItem("forgetEmail");
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin-bottom: 20px;

  & > .text-mail {
    font-size: 23px;
    line-height: 28px;
    text-align: center;
    color: $black-color;

    & span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media (max-width: $mobile) {
  .inputs-container {
    & > .text-mail {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
