<template>
  <ContentWrapper>
    <Heading text="Внесите данные для регистрации" is-download/>
    <div className="grid">
      <div className="sub-grid">
        <InputText
          title="Фамилия"
          v-model.lazy="state.last_name"
          :class="{ error: v$.last_name.$error }"
          :error="!!v$.last_name.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Имя"
          v-model.lazy="state.first_name"
          :class="{ error: v$.first_name.$error }"
          :error="!!v$.first_name.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Отчество"
          v-model.lazy="state.patronymic"
          :class="{ error: v$.patronymic.$error }"
          :error="!!v$.patronymic.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Индивидуальный номер налогоплательщика"
          :maxlength="12"
          v-model="state.inn"
          :class="{ error: v$.inn.$error }"
          :error="!!v$.inn.$error"
          error-text="Проверьте правильность введенных данных"
          v-on:keypress="isNumberDate(evt)"
        />
        <InputText
          title="Место рождения"
          v-model.lazy="state.birthplace"
          :class="{ error: v$.birthplace.$error }"
          :error="!!v$.birthplace.$error"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
      <div className="sub-grid">
        <Calendar
          title="Дата рождения"
          v-model="state.birthdate"
          error-text="Проверьте правильность введенных данных"
          v-on:keyup="isNumberDate($event.target.value, 'birthdate')"
        />
        <InputText
          title="Серия паспорта"
          v-model.lazy="state.passport_serial"
          :maxlength="4"
          :class="{ error: v$.passport_serial.$error }"
          :error="!!v$.passport_serial.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Номер паспорта"
          v-model.lazy="state.passport_number"
          :maxlength="6"
          :class="{ error: v$.passport_number.$error }"
          :error="!!v$.passport_number.$error"
          error-text="Проверьте правильность введенных данных"
          v-on:keypress="isNumberDate(evt)"
        />
        <InputDepartment
          title="Код подразделения"
          v-model.lazy="state.department_code"
          :class="{ error: v$.department_code.$error }"
          :error="!!v$.department_code.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Подразделение"
          v-model.lazy="state.department"
          :class="{ error: v$.department.$error }"
          :error="!!v$.department.$error"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
      <div className="sub-grid">
        <Calendar
          title="Дата выдачи паспорта"
          v-model="state.passport_date"
          error-text="Проверьте правильность введенных данных"
          v-on:keyup="isNumberDate($event.target.value, 'passport_date')"
        />
        <InputText
          title="Адрес регистрации"
          v-model.lazy="state.registration_address"
          :class="{ error: v$.registration_address.$error }"
          :error="!!v$.registration_address.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <div class="checkbox">
          <input
            id="address"
            type="checkbox"
            value="checked"
            v-model="isChecked"
          />
          <label for="address"
            >Адрес регистрации совпадает с адресом проживания</label
          >
        </div>
        <InputText
          v-show="isChecked === false"
          title="Адрес проживания"
          v-model="residenceAddress1"
          :class="{ error: v$.residence_address.$error }"
          :error="!!v$.residence_address.$error"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
    </div>
    <ButtonsContainer>
      <Button class="btn-text" text="Назад" @click="backToAuth" />
      <Button
        class="btn-text"
        text="Далее"
        :disabled="
          v$.$invalid ||
          this.state.birthdate.length === 0 ||
          this.state.passport_date.length === 0 ||
          residenceAddress1 === ''
        "
        @click.self.prevent="submitForm"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import InputText from "../../../components/InputText.vue";
import Calendar from "../../../components/Calendar.vue";
import Button from "../../../components/Button";
import ButtonsContainer from "../../../components/ButtonsContainer.vue";
import InputDepartment from "../../../components/InputDepartment";
import { createInvestor } from "../../../api/investor";
import { logout } from "../../../api/auth";
import { computed, reactive } from "vue";
import { maxLength, minLength, numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      first_name: "",
      last_name: "",
      patronymic: "",
      birthdate: [],
      birthplace: "",
      inn: "",
      passport_serial: "",
      passport_number: "",
      department_code: "",
      department: "",
      passport_date: [],
      registration_address: "",
      residence_address: "",
      privacy_policy_accepted: true,
    });
    const rules = computed(() => {
      return {
        first_name: {
          required,

          $autoDirty: true,
        },
        last_name: { required, $autoDirty: true },
        patronymic: { required, $autoDirty: true },
        birthplace: { required, $autoDirty: true },
        inn: {
          required,
          numeric,
          minLength: minLength(12),
          maxLength: maxLength(12),
          $autoDirty: true,
        },
        passport_serial: {
          required,
          numeric,
          minLength: minLength(4),
          maxLength: maxLength(4),
          $autoDirty: true,
        },
        passport_number: {
          required,
          numeric,
          minLength: minLength(6),
          maxLength: maxLength(6),
          $autoDirty: true,
        },
        department_code: { required, $autoDirty: true },
        department: { required, minLength: minLength(3), $autoDirty: true },
        registration_address: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
        },
        residence_address: {
          minLength: minLength(2),
          $autoDirty: true,
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Step1",
  components: {
    InputDepartment,
    ContentWrapper,
    Heading,
    Button,
    InputText,
    Calendar,
    ButtonsContainer,
  },
  data() {
    return {
      legalAddress1: "",
      postalAddress2: "",
      isChecked: false,
    };
  },
  mounted() {
    if (localStorage.first_name) {
      this.state.first_name = localStorage.first_name;
    }
    if (localStorage.last_name) {
      this.state.last_name = localStorage.last_name;
    }
    if (localStorage.patronymic) {
      this.state.patronymic = localStorage.patronymic;
    }
    if (localStorage.birthdate) {
      this.state.birthdate = localStorage.birthdate;
    }
    if (localStorage.birthplace) {
      this.state.birthplace = localStorage.birthplace;
    }
    if (localStorage.inn) {
      this.state.inn = localStorage.inn;
    }
    if (localStorage.passport_number) {
      this.state.passport_number = localStorage.passport_number;
    }
    if (localStorage.passport_serial) {
      this.state.passport_serial = localStorage.passport_serial;
    }
    if (localStorage.passport_date) {
      this.state.passport_date = localStorage.passport_date;
    }
    if (localStorage.department_code) {
      this.state.department_code = localStorage.department_code;
    }
    if (localStorage.department) {
      this.state.department = localStorage.department;
    }
    if (localStorage.registration_address) {
      this.state.registration_address = localStorage.registration_address;
    }
    if (localStorage.residence_address) {
      this.state.residence_address = localStorage.residence_address;
    }
  },
  methods: {
    createInvestor(data) {
      createInvestor(data).then((res) => {
        console.log(res, "TESTBorrower");
        this.$emit("btnNext");
      });
    },
    logout(data) {
      logout(data).then((res) => {
        console.log(res.status, "TestLogout");
        localStorage.removeItem("status");
      });
    },
    backToAuth() {
      this.logout();
      localStorage.removeItem("SavedToken");
      this.$store.commit("LOGIN_SUCCESS", "");
      this.$store.commit("SET_LOGGGED_IN", false);
      this.$router.push({ name: "Login" });
    },
    async submitForm() {
      //set to LocalStorage
      // const isStepCorrect = await this.v$.$validate();
      localStorage.last_name = this.state.last_name;
      localStorage.first_name = this.state.first_name;
      localStorage.patronymic = this.state.patronymic;
      localStorage.birthdate = this.state.birthdate.toString();
      localStorage.birthplace = this.state.birthplace;
      localStorage.inn = this.state.inn;
      localStorage.passport_number = this.state.passport_number;
      localStorage.passport_serial = this.state.passport_serial;
      localStorage.passport_date = this.state.passport_date.toString();
      localStorage.department_code = this.state.department_code;
      localStorage.department = this.state.department;
      localStorage.registration_address = this.state.registration_address;
      if (this.isChecked === true) {
        this.state.residence_address = this.state.registration_address;
        localStorage.residence_address = this.state.registration_address;
      } else {
        localStorage.residence_address = this.state.residence_address;
      }
      let data = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        patronymic: this.state.patronymic,
        photo: "futurePhoto",
        birthdate: this.state.birthdate.toString(),
        birthplace: this.state.birthplace,
        inn: this.state.inn,
        passport_serial: this.state.passport_serial,
        passport_number: this.state.passport_number,
        department_code: this.state.department_code,
        department: this.state.department,
        passport_date: this.state.passport_date.toString(),
        registration_address: this.state.registration_address,
        residence_address: this.state.residence_address,
        privacy_policy_accepted: localStorage.getItem(
          "privacy_policy_accepted"
        ),
      };
      this.createInvestor(data);
      // this.$emit("btnNext");
    },
    isNumberDate: function (evt, st) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        if(st) {
          this.state[st] = [evt]
        }
        return true;
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
  computed: {
    residenceAddress1: {
      get: function () {
        if (this.isChecked === true) {
          return this.state.registration_address;
        } else {
          return `${this.state.residence_address}`;
        }
      },
      set: function (val) {
        if (this.isChecked === true) {
          this.residenceAddress1 = this.state.registration_address;
        } else {
          this.state.residence_address = val;
          this.residenceAddress1 = this.state.residence_address;
        }
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 99px;
  @include bodyPadding;

  & > .sub-grid {
    & > div {
      margin-bottom: 26px;
    }
    & > .checkbox {
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
        width: 0;
        height: 0;
        position: absolute;
      }
    }
  }
}

@media (max-width: $tablet) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $mobile) {
  .grid {
    grid-template-columns: 1fr;
    border-bottom: 1px solid;
    margin-bottom: 40px;
    border-bottom: 1px solid #e6e2e2;
    padding-bottom: 13px;
    overflow: auto;
    & > .sub-grid {
      & > div {
        margin-bottom: 13px;
      }
    }
  }
}
</style>
