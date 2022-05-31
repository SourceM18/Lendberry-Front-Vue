<template>
  <ContentWrapper small>
    <Heading center text="Подтверждено" />
    <div class="inputs-container">
      <div class="text-mail">
        Ваш аккаунт успешно подтвержден, для авторизации используйте номер телефона:
        <span>{{ this.phone }}</span>
      </div>
    </div>
    <div className="button-container">
      <Button  text="Перейти к авторизации" @click="backToAuth" />
    </div>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";

export default {
  name: "PhoneCheckedVerification",
  components: {
    ContentWrapper,
    Heading,
    Button,
  },
  data() {
    return {
      phone: localStorage.userPhone,
      registrationType: "",
    };
  },
  mounted() {
    // if (localStorage.userPhone) {
    //   this.phone = localStorage.userPhone;
    // }
    if (localStorage.registrationType) {
      this.registrationType = localStorage.registrationType;
    }
  },
  methods: {
    backToAuth() {
        localStorage.removeItem("UserPhone");
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
.button-container {
  display: flex;
  justify-content: center;
  margin-top: auto;
}
@media (max-width: $mobile) {
  .inputs-container {
    & > .text-mail {
      font-size: 14px;
      line-height: 16px;
    }
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
