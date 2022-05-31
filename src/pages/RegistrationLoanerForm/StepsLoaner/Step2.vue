<template>
  <ContentWrapper>
    <Heading text="Внесите данные для регистрации" />
    <div class="grid">
      <div class="sub-grid">
        <NewSelect :org-forms="orgForms" />
        <InputText
          v-show="this.$store.state.borrower.selected !== 'ИП'"
          title="Наименование"
          v-model="state.orgName"
          :class="{ error: v$.orgName.$error }"
          :error="!!v$.orgName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          v-show="this.$store.state.borrower.selected === 'ИП'"
          title="Фамилия, имя, отчество"
          v-model="state.orgName"
          :class="{ error: v$.orgName.$error }"
          :error="!!v$.orgName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Сокращенное наименование"
          v-model="state.shortName"
          :class="{ error: v$.shortName.$error }"
          :error="!!v$.shortName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Адрес электронной почты"
          v-model.trim="state.email"
          :class="{ error: v$.email.$error }"
          :error="!!v$.email.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Бренд / маркетинговое наименование"
          v-model="state.brand"
          :class="{ error: v$.brand.$error }"
          :error="!!v$.brand.$error"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
      <div class="sub-grid">
        <InputText
          title="ИНН"
          v-model.trim="state.itn"
          :class="{ error: v$.itn.$error }"
          :error="!!v$.itn.$error"
          v-on:keypress="isNumberDate(evt)"
          error-text="Неверное значение"
        />
        <InputText
          v-if="selected !== 'ИП'"
          title="КПП"
          v-model.trim="state.iec"
          :class="{ error: v$.iec.$error }"
          :error="!!v$.iec.$error"
          v-on:keypress="isNumberDate(evt)"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Юридический адрес"
          v-model="state.legalAddress"
          :class="{ error: v$.legalAddress.$error }"
          :error="!!v$.legalAddress.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <div class="checkbox">
          <input id="address" type="checkbox" v-model="isChecked" />
          <label for="address"
            >Почтовый адрес совпадает с юридическим адресом</label
          >
        </div>
        <InputText
          v-show="isChecked === false"
          title="Почтовый адрес"
          v-model="postalAddress1"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
      <div class="sub-grid">
        <InputText
          title="ОГРН"
          v-model.trim="state.psrn"
          :maxlength="15"
          :class="{ error: v$.psrn.$error }"
          :error="!!v$.psrn.$error"
          v-on:keypress="isNumberDate(evt)"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          v-if="selected !== 'ИП'"
          title="ОКПО"
          v-model.trim="state.okpo"
          :class="{ error: v$.okpo.$error }"
          :error="!!v$.okpo.$error"
          v-on:keypress="isNumberDate(evt)"
          error-text="Проверьте правильность введенных данных"
        />
        <Calendar
          title="Дата регистрации"
          :calendar="state.registrationDate"
          v-model="state.registrationDate"
          :error="!!v$.registrationDate.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputPhone
          v-if="selected !== 'ИП'"
          v-model="state.contactNumber"
          title="Контактный номер телефона"
          :class="{ error: v$.contactNumber.$error }"
          :error="!!v$.contactNumber.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          v-if="selected !== 'ИП'"
          title="Уставной капитал, рублей"
          v-model="state.authorized_capital"
          :class="{ error: v$.authorized_capital.$error }"
          :error="!!v$.authorized_capital.$error"
          v-on:keypress="isNumber(e)"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
    </div>
    <ButtonsContainer>
      <Button
        class="btn-text"
        text="Назад"
        v-on:click="this.$emit('btnBack')"
      />
      <Button
        class="btn-text"
        text="Далее"
        :disabled="v$.$invalid"
        @click="submitForm"
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
import NewSelect from "../../../components/NewSelect";

import { createBorrower } from "../../../api/borrower";
import ButtonsContainer from "../../../components/ButtonsContainer.vue";
import {
  required,
  numeric,
  minLength,
  maxLength,
  email,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import InputPhone from "../../../components/InputPhone";

export default {
  setup() {
    const state = reactive({
      orgName: "",
      shortName: "",
      email: "",
      brand: "",
      itn: "",
      iec: "",
      legalAddress: "",
      postalAddress: "",
      psrn: "",
      okpo: "",
      registrationDate: [],
      contactNumber: "",
      authorized_capital: "",
    });

    const rules = computed(() => {
      return {
        email: { required, email, minLength: minLength(2), $autoDirty: true },
        orgName: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
        },
        shortName: { required, minLength: minLength(1), $autoDirty: true },
        brand: { minLength: minLength(2), $autoDirty: true },
        itn: {
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(12),
          $autoDirty: true,
        },
        iec: { numeric, minLength: minLength(9), $autoDirty: true },
        legalAddress: { required, $autoDirty: true },
        psrn: { required, numeric, minLength: minLength(13), $autoDirty: true },
        okpo: {
          numeric,
          minLength: minLength(8),
          maxLength: maxLength(10),
          $autoDirty: true,
        },
        registrationDate: { required, $autoDirty: true },
        contactNumber: { minLength: minLength(7), $autoDirty: true },
        authorized_capital: { minLength: minLength(3), $autoDirty: true },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },

  name: "Step2",

  components: {
    InputPhone,
    NewSelect,
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
      isOpen: false,
      isChecked: false,
      orgForms: [
        { id: 1, name: "ЗАО" },
        { id: 2, name: "ООО" },
        { id: 3, name: "ОДО" },
        { id: 4, name: "АО" },
        { id: 5, name: "Полное товарищество" },
        { id: 6, name: "Производственный кооператив" },
        { id: 7, name: "ЧУП" },
        { id: 8, name: "ГУП" },
        { id: 9, name: "МУП" },
        { id: 10, name: "ОАО" },
        { id: 11, name: "ИП" },
      ],
    };
  },
  methods: {
    createBorrower(data) {
      createBorrower(data).then((res) => {
        console.log(res, "TESTBorrower");
        this.$emit("btnNext");
      });
    },
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      if (isStepCorrect) {
        console.log("Form successfully submitted.");
        //set LocalStorage
        localStorage.select = this.selected;
        localStorage.name = this.state.orgName;
        localStorage.shortName = this.state.shortName;
        localStorage.email = this.state.email;
        localStorage.brand = this.state.brand;
        localStorage.iec = this.state.iec;
        localStorage.itn = this.state.itn;
        localStorage.legalAddress = this.state.legalAddress;
        localStorage.postalAddress = this.postalAddress1;
        localStorage.psrn = this.state.psrn;
        localStorage.okpo = this.state.okpo;
        localStorage.registrationDate = this.state.registrationDate.toString();
        localStorage.contactNumber = this.state.contactNumber;
        localStorage.authorizedCapital = this.state.authorized_capital;
        if (this.selected !== "ИП") {
          let data = {
            form: this.$store.state.borrower.selected, // eslint-disable-line
            logo: "1",
            name: this.state.orgName,
            short_name: this.state.shortName,
            email: this.state.email,
            brand: this.state.brand,
            inn: this.state.itn,
            kpp: this.state.iec,
            legal_address: this.state.legalAddress,
            postal_address: this.postalAddress1,
            ogrn: this.state.psrn,
            okpo: this.state.okpo,
            registration_date: this.state.registrationDate.toString(),
            contact_number: this.state.contactNumber,
            authorized_capital: this.state.authorized_capital,
          };
          this.createBorrower(data);
        } else {
          let data = {
            form: this.$store.state.selected, // eslint-disable-line
            logo: "1",
            name: this.state.orgName,
            short_name: this.state.shortName,
            email: this.state.email,
            brand: this.state.brand,
            inn: this.state.itn,
            legal_address: this.state.legalAddress,
            postal_address: this.postalAddress1,
            okpo: this.state.okpo,
            registration_date: this.state.registrationDate.toString(),
          };
          this.createBorrower(data);
        }
      } else {
        console.log("Form failed validation");
      }
    },
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
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
    isNumberDate: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },

  created() {},

  //localStorage
  mounted() {
    if (localStorage.select) {
      this.selected = localStorage.select;
    }
    if (localStorage.name) {
      this.state.orgName = localStorage.name;
    }
    if (localStorage.shortName) {
      this.state.shortName = localStorage.shortName;
    }
    if (localStorage.email) {
      this.state.email = localStorage.email;
    }
    if (localStorage.brand) {
      this.state.brand = localStorage.brand;
    }
    if (localStorage.iec) {
      this.state.iec = localStorage.iec;
    }
    if (localStorage.itn) {
      this.state.itn = localStorage.itn;
    }
    if (localStorage.legalAddress) {
      this.state.legalAddress = localStorage.legalAddress;
    }
    if (localStorage.postalAddress) {
      this.state.postalAddress = localStorage.postalAddress;
    }
    if (localStorage.psrn) {
      this.state.psrn = localStorage.psrn;
    }
    if (localStorage.okpo) {
      this.state.okpo = localStorage.okpo;
    }
    if (localStorage.registrationDate) {
      this.state.registrationDate = localStorage.registrationDate;
    }
    if (localStorage.contactNumber) {
      this.state.contactNumber = localStorage.contactNumber;
    }
    {
      if (localStorage.authorizedCapital) {
        this.state.authorized_capital = localStorage.authorizedCapital;
      }
    }
  },

  computed: {
    postalAddress1: {
      get: function () {
        if (this.isChecked === true) {
          return this.state.legalAddress;
        } else {
          console.log("TEST");
          return `${this.postalAddress2}`;
        }
      },
      set: function (val) {
        if (this.isChecked === true) {
          this.postalAddress1 = this.state.legalAddress;
        } else {
          this.postalAddress2 = val;
          this.postalAddress1 = this.postalAddress2;
        }
      },
    },
    selected() {
      return this.$store.getters.GET_SELECTED;
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
