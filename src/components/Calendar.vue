<template>
  <div class="calendar">
    <p class="title" :class="{ active: isOpen }">{{ title }}</p>
    <div class="header">
      <div>
        <input v-bind:value="modelValue" v-maska="'####/##/##'" />
      </div>
      <img
        @click="toggleCalendar"
        role="button"
        class="ico"
        alt=""
        src="../assets/ico/Calendar.svg"
      />
    </div>
    <div
      :class="[
        isOpen ? 'body' : 'hide',
        { positionRelative: positionRelative },
      ]"
    >
      <div class="grid">
        <CalendarRow
          title="День"
          :data="formattedSelectedDateDays"
          @my-event="resetValue"
          @that-event="setValue"
        />
        <CalendarRow
          title="Месяц"
          :data="formattedSelectedDateMonth"
          @my-event="resetValueMonth"
          @that-event="setValueMonth"
        />
        <CalendarRow
          title="Год"
          :data="formattedSelectedDateYears"
          @my-event="resetValueYears"
          @that-event="setValueYears"
        />
      </div>
      <div class="buttons">
        <Button text="Сбросить" @click="resetCalendarValue" />
        <Button text="Выбрать" @click="setCalendarValue" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import CalendarRow from "../components/CalendarRow.vue";

import moment from "moment";
import { maska } from "maska";

//momentDate
// eslint-disable-next-line no-unused-vars
let currentDate = moment();

export default {
  name: "Calendar",
  components: {
    Button,
    CalendarRow,
  },
  props: {
    title: String,
    positionRelative: Boolean,
    modelValue: Array && String,
  },
  directives: { maska },
  data() {
    return {
      selectedDate: moment(),
      selectedMonth: moment(),
      selectedYears: moment(),
      isOpen: false,
      isAway: false,
      picked: String,
      val: this.modelValue,
      calendarDate: [],
    };
  },
  computed: {
    formattedSelectedDateDays: function () {
      return this.selectedDate.format("DD");
    },
    formattedSelectedDateMonth: function () {
      return this.selectedMonth.format("MM");
    },
    formattedSelectedDateYears: function () {
      return this.selectedYears.format("YYYY");
    },
  },
  mounted: function () {},
  methods: {
    toggleCalendar() {
      this.isOpen = !this.isOpen;
    },
    resetValue: function () {
      this.selectedDate = moment(this.selectedDate).subtract(1, "days");
    },
    setValue() {
      this.selectedDate = moment(this.selectedDate).add(1, "days");
    },
    resetValueMonth: function () {
      this.selectedMonth = moment(this.selectedMonth).subtract(1, "months");
    },
    setValueMonth() {
      this.selectedMonth = moment(this.selectedMonth).add(1, "months");
    },
    resetValueYears: function () {
      this.selectedYears = moment(this.selectedYears).subtract(1, "years");
    },
    setValueYears() {
      this.selectedYears = moment(this.selectedYears).add(1, "years");
    },
    setCalendarValue() {
      // let futureDate = currentDate.format("YYYY-MM-DD")
      this.calendarDate
        .push(
          this.selectedYears.format("YYYY") +
            `-` +
            this.selectedMonth.format("MM") +
            `-` +
            this.selectedDate.format("DD")
        )
        .toString();
      if (this.calendarDate.length > 1) this.calendarDate.shift();
      if (
        this.calendarDate.toString() <=
        currentDate.format("YYYY-MM-DD").toString()
      ) {
        if (localStorage.birthdate && localStorage.passport_date) {
          this.calendarDate =[]
          this.val = []
        }
        this.val
          .push(
            this.selectedYears.format("YYYY") +
              `-` +
              this.selectedMonth.format("MM") +
              `-` +
              this.selectedDate.format("DD")
          )
          .toString();
        if (this.val.length > 1) this.val.shift();
      } else {
        this.calendarDate.shift();
        alert("Введите правильную дату");
      }
      localStorage.removeItem("birthdate");
      localStorage.removeItem("passport_date");
      this.isOpen = !this.isOpen;
    },
    resetCalendarValue() {
      console.log('eee', this.val)
      // this.val.shift();
      // if (this.val.toString() !== "") {
      //   this.val = "";
      // }
      localStorage.removeItem("birthdate");
      localStorage.removeItem("passport_date");
      this.isOpen = !this.isOpen;
    },
  },

  created() {
    this.setValue();
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.calendar {
  position: relative;
  & input {
    border: none;
    font-family: inherit;
    @include text;
  }
  & > .header {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-column-gap: 10px;
    align-items: flex-end;
    border-bottom: 1px solid $black-color;
    @include text;
    padding: 0 5px 5px;
    min-height: 27px;
    cursor: pointer;

    & > .ico {
      margin-left: auto;
      width: 19px;
      height: auto;
    }
  }
  & > .title {
    @include titleText;
    margin-bottom: 4px;
    &.active {
      color: $active-color;
    }
  }
  & > .hide {
    display: none;
  }
  & > .body {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-column-gap: 10px;
    border-bottom: 1px solid $black-color;
    position: absolute;
    width: 100%;
    top: 100%;
    background-color: $white-color;
    padding: 15px;
    z-index: 1;
    &.positionRelative {
      position: relative;
      top: 0;
    }
    & > .grid {
      display: grid;
      grid-row-gap: 18px;
      padding: 14px 0;
    }
    & > .buttons {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > button {
        font-size: 14px;
      }
    }
  }
}
</style>
