<template>
  <ContentWrapper small>
    <Heading center text="Выберите вариант регистрации" />
    <div class="inputs-container">
      <div class="checkbox">
        <input
          id="investor"
          type="radio"
          value="email"
          v-model="registrationType"
        />
        <label for="investor">
          <p class="text">
            Зарегистрироваться при помощи <span> электронной почты</span>
          </p>
        </label>
      </div>
      <div class="checkbox">
        <input
          id="borrower"
          type="radio"
          value="phone"
          v-model="registrationType"
        />
        <label for="borrower">
          <p class="text">
            Зарегистрироваться при помощи <span> мобильного телефона</span>
          </p>
        </label>
      </div>
    </div>
    <ButtonsContainer>
      <Button text="Назад" v-on:click="this.$emit('btnBack')" />
      <Button
        text="Далее"
        @click="NextBtn"
        :disabled="this.registrationType === '' "
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";

export default {
  name: "Step3",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
  },
  data() {
    return {
      registrationType:"",
      type: localStorage.type,
      disable: false
    };
  },
  methods: {
    NextBtn() {
      localStorage.registrationType = this.registrationType;
      if (this.registrationType === "email") {
        this.$router.push({ name: "RegistrationEmail" });
      } else {
        this.$router.push({ name: "RegistrationPhone" });
      }
    },
  },
  computed () {

  },
  mounted() {
    if (localStorage.registrationType) {
      this.registrationType = localStorage.registrationType;
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.inputs-container {
  margin: auto 0;
  & .text {
    font-size: 18px;
    line-height: 21px;
    & > span {
      color: $active-color;
      font-weight: 700;
    }
  }
  & > :first-child {
    margin-bottom: 66px;
  }
}
.checkbox {
  position: relative;
  user-select: none;
  height: 45px;
  display: flex;
  align-items: center;
  & > label {
    cursor: pointer;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    grid-column-gap: 12px;
    @include text;

    &::before {
      content: "";
      display: block;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid;
      border-color: $black-color;
    }
  }
  & > input:checked ~ label {
    &::before {
      background-color: $active-color;
      border-color: $active-color;
    }
  }
  & > input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
  }
}
@media (max-width: $mobile) {
  .checkbox {
    height: 33px;
    & > label {
      &::before {
        width: 14px;
        height: 14px;
      }
    }
  }
}
@media (max-width: $mobile) {
  .inputs-container {
    margin: auto;
    & .text {
      font-size: 12px;
      line-height: 14px;
    }
    & > :first-child {
      margin-bottom: 53px;
    }
  }
}
</style>
