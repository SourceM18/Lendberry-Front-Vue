<template>
  <ContentWrapper small>
    <div class="tab-btn-wrapper">
      <p class="tab-btn" :class="{ active: isAuthShow }" @click="isAuth(true)">Авторизация</p>
      <P class="tab-btn" :class="{ active: isRegShow }" @click="isAuth(false)">Регистрация</p>
    </div>

    <div class="tab-container-wrapper">
      <div v-if="isAuthShow"><Authorization /></div>
      <div v-else><Step1 v-on:btnNext="goNext"/></div>
    </div>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Step1 from "@/pages/Registration/Step1";
import Authorization from "@/pages/Authorization/Authorization";

export default {
  name: "Home",
  components: { Step1, ContentWrapper, Authorization },
  data(){
    return{
      isAuthShow: true,
      isRegShow: false,
    }
  },
  methods: {
    isAuth(show) {
      this.isAuthShow = show;
      this.isRegShow = !show
    },
    goNext() {
      if (this.$store.state.common.currentStepRegistration < 3)
        this.$store.commit("incrementStepRegistration");
      console.log(this.$store.state.common.currentStepRegistration, "test2");
    },
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";

  .tab{
    &-btn{
      cursor: pointer;
      font-weight: bold;
      font-size: 24px;

      &:hover, &.active{
        color: $active-color
      }

      &-wrapper {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-around;
        color: #656565;
      }
     }

    &-container {
      display: flex;
      width: 100%;
      height: 100%;

      &-wrapper {
        height: 100%;
        > div {
          height: 100%;
        }
      }
    }
  }
</style>