<template>
  <Header class="header" />
  <div class="sidebar">    
  </div>
  <div className="page-container">
    <router-view />    
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "src/styles/variables";

* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  &:focus {
    outline: none;
  }
}

body {
  background-color: $bg-color;
}

#app {
  max-width: 1366px;
  margin: auto;
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content 1fr;
  // overflow: hidden;

  & > .header {
    grid-column: 1/3;
    margin-bottom: 40px;
  }
}

.page-container {
  padding: 5px 35px 45px;
  height: 100%;
}
@media (max-width: $tablet) {
  #app {
    & > .header {    
    margin-bottom: 32px;
  }
    & > .sidebar {
      grid-column: 1/3;
      grid-row: 3/4;
    }
  }
  .page-container {
    overflow: hidden;
    grid-column: 1/3;
     padding: 5px 35px 30px;
  }
}
@media (max-width: $mobile) {
  #app {
    & > .header {    
    margin-bottom: 18px;
  }}
  .page-container {
    padding: 5px 11px 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
