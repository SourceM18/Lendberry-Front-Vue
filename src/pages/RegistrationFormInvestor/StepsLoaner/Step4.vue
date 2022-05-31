<template>
  <div class="grid">
    <SidebarRegistration class="sidebar" />
    <ButtonSection text="Основные данные" id="stepOne" @click="openBtn" />
    <ButtonSection text="Файлы" id="stepTwo" @click="openBtn" />
    <ButtonBig text="Отправить на проверку" />
  </div>
</template>

<script>
import ButtonBig from "@/components/ButtonBig.vue";
import ButtonSection from "@/components/ButtonSection.vue";
import SidebarRegistration from "@/components/SidebarRegistration.vue";

export default {
  name: "Step4",
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
      if (e.target.id === "stepOne") {
        this.$store.commit("goToStepFirstInvestor");
      } else {
        this.$store.commit("goToStepThirdInvestor");
      }
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
  grid-template-rows: 100px 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 40px;
  width: 100%;
  max-height: 506px;
  height: 100%;
  & > :last-child {
    grid-column: 2/4;
    justify-self: end;
    align-self: flex-end;
  }
  & > .sidebar {
    grid-row: 1/3;
    margin-left: -35px;
  }
}
@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 100px) max-content;
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
    grid-template-rows: repeat(2, 56px) max-content;
    grid-row-gap: 13px;
    padding: 4px 4px 41px;
  }
}
</style>
