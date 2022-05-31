<template>
  <div class="grid">
    <SidebarRegistration class="sidebar" />
    <ButtonSection text="Основные данные" @click="openBtn" id="stepTwo" />
    <ButtonSection text="Сферы деятельности" @click="openBtn" id="stepThree" />
    <ButtonSection
      v-show="this.$store.state.borrower.selected !== 'ИП'"
      text="Данные руководителя (-ей)"
      @click="openBtn"
      id="stepFour"
    />
    <ButtonSection
      v-show="this.$store.state.borrower.selected !== 'ИП'"
      text="Данные бухгалтера"
      @click="openBtn"
      id="stepFive"
    />
    <ButtonSection
      v-show="this.$store.state.borrower.selected !== 'ИП'"
      text="Данные учредителей"
      @click="openBtn"
      id="stepSix"
    />
    <ButtonSection text="Финансовые данные" @click="openBtn" id="stepSeven" />
    <ButtonBig text="Отправить на проверку" @click="sendBorrowerData" />
  </div>
</template>

<script>
import ButtonBig from "@/components/ButtonBig.vue";
import ButtonSection from "@/components/ButtonSection.vue";
import SidebarRegistration from "@/components/SidebarRegistration.vue";

export default {
  name: "Step9-2",
  components: {
    ButtonBig,
    ButtonSection,
    SidebarRegistration,
  },
  data: function () {
    return {};
  },
  methods: {
    openBtn(e) {
      if (e.target.id === "stepTwo") {
        this.$store.commit("goToStepTwo");
      } else if (e.target.id === "stepThree") {
        this.$store.commit("goToStepThree");
      } else if (e.target.id === "stepFour") {
        this.$store.commit("goToStepFour");
      } else if (e.target.id === "stepFive") {
        this.$store.commit("goToStepFive");
      } else if (e.target.id === "stepSix") {
        this.$store.commit("goToStepSix");
      } else {
        this.$store.commit("goToStepSeven");
      }
    },
    sendBorrowerData() {
      localStorage.removeItem("financial_performance_period_on");
      localStorage.removeItem("financial_performance_period_with");
      localStorage.removeItem("bank_statement_period_on");
      localStorage.removeItem("bank_statement_period_with");
      localStorage.removeItem("accountant_balance_period_with");
      localStorage.removeItem("accountant_balance_period_on");
      localStorage.removeItem("registrationDate");
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  display: grid;
  grid-template-columns: max-content 1fr 1fr;
  grid-template-rows: repeat(3, 100px) max-content;
  grid-column-gap: 24px;
  grid-row-gap: 40px;
  width: 100%;

  & > :last-child {
    grid-column: 2/4;
    justify-self: end;
  }
  & > .sidebar {
    grid-row: 1/5;
    margin-left: -35px;
  }
}
@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 100px) max-content;
    grid-row-gap: 24px;
    overflow: auto;
    height: 100%;
    padding: 4px 4px 70px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #c4c4c4;
    }
    scrollbar-width: thin;

    & > :last-child {
      grid-column: 1/2;
      justify-self: end;
    }

    & > .sidebar {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-left: 0;
    }
  }
}
@media (max-width: $mobile) {
  .grid {
    grid-template-rows: repeat(6, 56px) max-content;
    grid-row-gap: 13px;
    padding: 4px 4px 41px;
  }
}
</style>
