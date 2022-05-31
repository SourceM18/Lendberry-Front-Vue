<template>
  <div class="header-wrapper">
    <router-link class="link" to="/">
      <img
        class="logo-desktop"
        alt="Land-berry logo"
        src="../assets/ico/logo.svg"
      />
      <img
        class="logo-mobile"
        alt="Land-berry logo"
        src="../assets/ico/Logo2.svg"
      />
    </router-link>
    <div class="link-block">
      <router-link class="link" to="#">
        <img class="ico" alt="" src="../assets/ico/Moon.svg" />
      </router-link>
      <router-link class="link" to="#">
        <img class="ico" alt="" src="../assets/ico/Notifications.svg" />
      </router-link>
      <router-link class="link" to="#">
        <img class="ico" alt="" src="../assets/ico/FAQ.svg" />
      </router-link>
      <router-link class="link" to="#">
        <img class="ico" alt="" src="../assets/ico/Contacts.svg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";

.header-wrapper {
  width: 100%;
  height: 66px;
  background-color: $white-color;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 20px 20px;
  padding: 0 21px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  & > .link-block {
    & > .link {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 30px;
      }

      & > .ico {
        height: 26px;
        width: auto;
      }
    }
  }
  & .logo-mobile {
    display: none;
  }
}
@media (max-width: $mobile) {
  .header-wrapper {
    height: 41px;
    & > .link-block {
      & > .link {
        &:not(:last-child) {
          margin-right: 15px;
        }
      }
    }
    & .logo-mobile {
      display: block;
    }
    & .logo-desktop {
      display: none;
    }
  }
}
</style>
