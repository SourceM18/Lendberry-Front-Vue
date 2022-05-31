<template>
  <ContentWrapper small>
    <Heading  center text="Ожидание подтверждения" />
    <div class="inputs-container">
      <div class="text-mail">
        Ссылка на подтверждение аккаунта отправлена на почту:
        <span>{{ this.email }}</span>
      </div>
    </div>
    <ButtonsContainer>
      <Button  text="Назад" @click="backToAuth" />
      <Button text="Отправить повторно" @click="resendEmail" />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import { resendEmailVerification } from "../../api/auth";

export default {
  name: "VerificationCheckedPage",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
  },
  data() {
    return {
      email: "",
      phone: "",
      registrationType: "",
    };
  },
  mounted() {
    if (localStorage.userEmail) {
      this.email = localStorage.userEmail;
    }
    if (localStorage.userPhone) {
      this.phone = localStorage.userPhone;
    }
    if (localStorage.registrationType) {
      this.registrationType = localStorage.registrationType;
    }
  },
  methods: {
    resendEmailVerification(data) {
      resendEmailVerification(data)
          .then((res) => {
            alert(res.status);
            this.$router.push({ name: "Login" });
            localStorage.removeItem("userEmail");
          })
          .catch((error) => {
            console.log(error, "Forget Email");
          });
    },
    backToAuth() {
      if (this.registrationType === "email") {
        localStorage.removeItem("userEmail");
        this.$router.push({ name: "RegistrationEmail" });
      } else {
        localStorage.removeItem("UserPhone");
        this.$router.push({ name: "Login" });
      }
    },
    resendEmail() {
      let data = {
        email: this.email,
      };
      this.resendEmailVerification(data);
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
