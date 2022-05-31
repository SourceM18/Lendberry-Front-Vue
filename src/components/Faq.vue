<template>
<div class="faq">
  <img src="../assets/ico/FAQ.svg" alt="FAQ" @click="openFaq">

  <div class="faq-popup" v-if="this.state.isOpen">
    <div>
      <p>Необходимо загрузить следующие документы:</p>
      <ul>
        <li>Скан паспорта</li>
        <li>Устав компании</li>
        <li>Документ 1</li>
        <li>Документ 2</li>
      </ul>
    </div>
    <img src="../assets/ico/FAQ.svg" alt="FAQ" @click="closeFaq">
  </div>
</div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup(){
    const state = reactive({
      isOpen: false,
    });
    return {state}
  },
  name: "FAQ",
  methods: {
    closeFaq() {
      this.state.isOpen = false;
    },
    openFaq(){
      this.state.isOpen = true
    },
  }
};
</script>

<style scoped lang="scss">
.faq {
  position: relative;
  & > img{
    width: 22px;
    cursor: pointer;
  }
  &-popup {
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    position: absolute;
    background: #ffffff;
    top: -10px;
    right: -30px;
    z-index: 200;
    width: 342px;
    padding: 25px 20px;
    display: flex;
    align-items: flex-start;
    font-size: 14px;

    & > img {
      width: 38px;
      cursor: pointer;
    }

    ul > li {
      margin-left: 25px;
    }
  }
}
</style>