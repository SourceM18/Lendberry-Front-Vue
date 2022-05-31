<template>
  <div class="grid">
    <ButtonSection text="Основные данные" linkTo="/" />
    <ButtonSection text="Сферы деятельности" linkTo="/" />  
    <ButtonSection text="Финансовые данные" linkTo="/" />
    <ButtonBig text="Отправить на проверку" />
  </div>
</template>

<script>
import ButtonBig from "@/components/ButtonBig.vue";
import ButtonSection from "@/components/ButtonSection.vue";

export default {
  name: "Step9",
  components: {
    ButtonBig,
    ButtonSection,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 100px) 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 40px;
  width: 100%;
  max-height: 506px;
  height: 100%;
  & > :last-child {
    grid-column: 1/3;
    justify-self: end;
  }
}
@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 100px) max-content;
    grid-row-gap: 24px;
    & > :last-child {
      grid-column: 1/2;
      justify-self: end;
    }
  }
}
@media (max-width: $mobile) {
  .grid {    
    grid-template-rows: repeat(4, 56px) max-content;
    grid-row-gap: 13px;   
  }
}
</style>
