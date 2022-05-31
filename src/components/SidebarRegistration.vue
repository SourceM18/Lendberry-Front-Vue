<template>
  <div class="sidebar-wrapper" :class="{ active: isOpen }">
    <div class="mobile-nav" @click="toggleMenu">
      <img class="ico-arrow" src="@/assets/ico/arrow-bottom.svg" />
      <Indicator class="ico" />
      <Watch class="ico" />
      <Calendar class="ico" />
    </div>

    <div class="sidebar-registration">
      <div class="sub-block">
        <p>
          <Indicator class="ico" :class="{ activeIco: activeIco }" />
          Статус валидации
        </p>
        <span>Требуются корректировки</span>
      </div>
      <div class="sub-block">
        <p><Watch class="ico" />Срок рассмотрения</p>
        <span>3 дня с момента подачи</span>
      </div>
      <div class="sub-block">
        <p><Calendar class="ico" />Результат</p>
        <span>{{ selectedCurrentDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Indicator from "@/assets/ico/Indicator.vue";
import Watch from "@/assets/ico/watch.vue";
import Calendar from "@/assets/ico/Calendar.vue";
import moment from "moment";

export default {
  name: "SidebarRegistration",
  components: { Indicator, Watch, Calendar },
  props: {},

  data() {
    return {
      isOpen: false,
      activeIco: true,
      currentDate: moment(),
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    selectedCurrentDate: function () {
      return this.currentDate.add(3, "days").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.sidebar-wrapper {
  max-height: 506px;
  height: 100%;
  width: 264px;
  box-shadow: 0px -4px 5px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0px 20px 20px 0px;
  background-color: $white-color;
  padding: 66px 22px 22px 36px;
  z-index: 1;

  .mobile-nav {
    display: none;
  }
  .sidebar-registration {
    display: grid;
    grid-row-gap: 33px;

    & > .sub-block {
      & > p {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 16px;
        line-height: 18px;
        & > svg {
          height: 100%;
          width: auto;
          margin-right: 14px;
          stroke: $blue-color;
          &.activeIco {
            stroke: #208414;
          }
        }
      }
      & > span {
        display: block;
        font-size: 14px;
        line-height: 16px;
        margin-top: 14px;
      }
    }
  }
}
@media (max-width: $tablet) {
  .sidebar-wrapper {
    width: 100vw;
    max-height: unset;
    height: 68px;
    padding: 19px 55px;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05),
      0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px 20px 0px 0px;
    align-items: center;
    transition: height 0.3s;
    overflow: hidden;
    & > .mobile-nav {
      display: flex;
      justify-content: space-between;
      margin-bottom: 55px;

      & > svg {
        height: 30px;
        width: auto;
        stroke: $blue-color;
      }
      & > .ico-arrow {
        display: none;
      }
    }
    .sidebar-registration {
      & > .sub-block {
        & > p {
          font-size: 24px;
          line-height: 28px;
          & > svg {
            height: 30px;
          }
        }
        & > span {
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
  &.active {
    position: absolute;
    bottom: 0;
    left: 0;
    height: calc(100vh - 91px);
    z-index: 1;
    transition: height 0.3s;
    padding: 26px 95px;
    & > .mobile-nav {
      justify-content: center;
      & > .ico-arrow {
        display: block;
        width: 58px;
        height: auto;
      }
      & > .ico {
        display: none;
      }
    }
  }
}

@media (max-width: $mobile) {
  .sidebar-wrapper {
    height: 41px;
    padding: 12px 35px;

    & > .mobile-nav {
      margin-bottom: 36px;
      & > .ico {
        height: 17px;
        width: auto;
      }
    }
    .sidebar-registration {
      & > .sub-block {
        & > p {
          font-size: 16px;
          line-height: 18px;
          & > svg {
            height: 100%;
          }
        }
        & > span {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }
  &.active {
    height: calc(100vh - 60px);
    padding: 19px 55px;
    & > .mobile-nav {
      & > .ico-arrow {
        width: 43px;
      }
    }
  }
}
</style>
