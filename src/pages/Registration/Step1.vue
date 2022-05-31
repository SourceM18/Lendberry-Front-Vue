<template>
  <div class="container-wrapper">
    <p class="container-title">Выберите вариант регистрации</p>
    <div class="inputs-container">
      <div class="checkbox">
        <input id="investor" type="radio" value="investor" v-model="type" />
        <label for="investor">
          <p class="text">Зарегистрироваться как <span> Инвестор</span></p>
        </label>
      </div>
      <div class="checkbox">
        <input id="borrower" type="radio" value="borrower" v-model="type" />
        <label for="borrower">
          <p class="text">Зарегистрироваться как <span> Заемщик</span></p>
        </label>
      </div>
    </div>
    <ButtonsContainer>
      <Button text="Назад" v-on:click="this.$emit('btnBack')" />
      <Button text="Далее" @click="NextBtn" :disabled="this.type === ''" />
    </ButtonsContainer>
  </div>
</template>

<script>
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";

export default {
  name: "Step1",
  components: {
    Button,
    ButtonsContainer,
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    NextBtn() {
      localStorage.type = this.type;
      this.$store.commit("UPDATE_TYPE", localStorage.getItem("type"));
      this.$emit("btnNext");
    },
  },
  computed: {},
  mounted() {
    if (localStorage.type) {
      this.type = localStorage.type;
    }

  },
  created() {
      localStorage.removeItem("registrationType")
  }
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
.container-title{
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: $active-color;
  padding-top: 25px;
  margin-bottom: -40px;
}

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
    width: 0px;
    height: 0px;
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
