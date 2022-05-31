<template>
  <ContentWrapper>
    <Heading text="Внесите банковские данные" />
    <div class="grid">
      <div class="sub-grid">
        <div class="inputAccountant" :class="{ error: error }">
          <p class="title">Бухгалтерский баланс</p>
          <div class="input-container" :class="{ flexStart: true }">
            <label
              v-if="seen === false"
              id="input_label"
              class="title"
              v-on:click="addFilesAccountant()"
            >
              <img alt="" src="../../../assets/ico/Add.svg" />
              Добавить файл
            </label>
            <label
              v-else
              id="input"
              class="title"
              v-on:click="addFilesAccountant()"
            >
              <img alt="" src="../../../assets/ico/Backet.svg" />
              <span v-if="this.filesAcc">{{ this.filesAcc.name }}</span>
            </label>
            <input
              class="input"
              type="file"
              ref="input_file_accountant"
              name="attachment[]"
              @change="onFileChangeAcc"
              accept="application/pdf"
              multiple
            />
            <ErrorMessage
              smallIco
              v-if="error"
              errorText="Размер загруженного файла не должен превышать 60 кб"
            />
          </div>
        </div>
        <div class="inputAccountant" :class="{ error: error }">
          <p class="title">Финансовые показатели</p>
          <div class="input-container" :class="{ flexStart: true }">
            <label
              v-if="seenFin === false"
              id="input_label_2"
              class="title"
              v-on:click="addFilesFinance()"
            >
              <img alt="" src="../../../assets/ico/Add.svg" />
              Добавить файл
            </label>
            <label
              v-else
              id="input_2"
              class="title"
              v-on:click="addFilesFinance()"
            >
              <img alt="" src="../../../assets/ico/Backet.svg" />
              <span v-if="this.filesFin">{{ this.filesFin.name }}</span>
            </label>
            <input
              class="input"
              type="file"
              ref="input_file_finance"
              name="attachment[]"
              @change="onFileChangeFinance"
              accept="application/pdf"
            />
            <ErrorMessage
              smallIco
              v-if="error"
              errorText="Размер загруженного файла не должен превышать 60 кб"
            />
          </div>
        </div>
        <div class="inputAccountant" :class="{ error: error }">
          <p class="title">Банковская выписка</p>
          <div class="input-container" :class="{ flexStart: true }">
            <label
              v-if="seenBank === false"
              id="input_label_3"
              class="title"
              v-on:click="addFilesBank()"
            >
              <img alt="" src="../../../assets/ico/Add.svg" />
              Добавить файл
            </label>
            <label
              v-else
              id="input_3"
              class="title"
              v-on:click="addFilesBank()"
            >
              <img alt="" src="../../../assets/ico/Backet.svg" />
              <span v-if="this.filesBank">{{ this.filesBank.name }}</span>
            </label>
            <input
              class="input"
              type="file"
              ref="input_file_bank"
              name="attachment[]"
              @change="onFileChangeBank"
              accept="application/pdf"
            />
            <ErrorMessage
              smallIco
              v-if="error"
              errorText="Размер загруженного файла не должен превышать 60 кб"
            />
          </div>
        </div>
      </div>
      <div class="sub-grid">
        <Calendar
          positionRelative
          :calendar="state.accountant_balance_period_with"
          v-model="state.accountant_balance_period_with"
          title="Бухгалтерский баланс, период с"
          :error="!!v$.accountant_balance_period_with.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <Calendar
          positionRelative
          :calendar="state.financial_performance_period_with"
          v-model="state.financial_performance_period_with"
          title="Финансовые показатели, период с"
          :error="!!v$.financial_performance_period_with.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <Calendar
          positionRelative
          :calendar="state.bank_statement_period_with"
          v-model="state.bank_statement_period_with"
          title="Банковская выписка, период с"
          :error="!!v$.bank_statement_period_with.$error"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
      <div class="sub-grid">
        <Calendar
          positionRelative
          :calendar="state.accountant_balance_period_on"
          v-model="state.accountant_balance_period_on"
          title="Бухгалтерский баланс, период по"
          :error="!!v$.accountant_balance_period_on.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <Calendar
          positionRelative
          :calendar="state.financial_performance_period_on"
          v-model="state.financial_performance_period_on"
          title="Финансовые показатели, период по"
          :error="!!v$.financial_performance_period_on.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <Calendar
          positionRelative
          :calendar="state.bank_statement_period_on"
          v-model="state.bank_statement_period_on"
          title="Банковская выписка, период по"
          :error="!!v$.bank_statement_period_on.$error"
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
        :disabled="
          v$.$invalid ||
          this.filesFin === 0 ||
          this.filesAcc === 0 ||
          this.filesBank === 0
        "
        text="Далее"
        @click="submitForm()"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import Calendar from "../../../components/Calendar.vue";
import Button from "../../../components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import ErrorMessage from "../../../components/ErrorMessage";
import { createFinancialData } from "../../../api/borrower";
import { computed, reactive } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    const state = reactive({
      accountantBalance: "",
      bankStatement: "",
      financialPerfomance: "",
      financial_performance_period_with: [],
      bank_statement_period_with: [],
      accountant_balance_period_with: [],
      bank_statement_period_on: [],
      financial_performance_period_on: [],
      accountant_balance_period_on: [],
    });
    const rules = computed(() => {
      return {
        financial_performance_period_with: { required, $autoDirty: true },
        bank_statement_period_with: { required, $autoDirty: true },
        accountant_balance_period_with: { required, $autoDirty: true },
        bank_statement_period_on: { required, $autoDirty: true },
        financial_performance_period_on: { required, $autoDirty: true },
        accountant_balance_period_on: { required, $autoDirty: true },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Step8",
  components: {
    ContentWrapper,
    Heading,
    Button,
    Calendar,
    ButtonsContainer,
    ErrorMessage,
  },
  data() {
    return {
      errorFile: false,
      errorText: false,
      FlexStart: false,
      seen: false,
      seenFin: false,
      seenBank: false,
      error: false,
      filesAcc: null,
      filesFin: null,
      filesBank: null,
      singleFileAcc: {},
      singleFileFin: {},
      singleFileBank: {},
      localFilesAccStorage: [],
      localFilesFinStorage: [],
      localFilesBankStorage: [],
    };
  },
  created() {
    let returnFilesAcc = JSON.parse(localStorage.getItem("filesAcc"));
    this.singleFileAcc = returnFilesAcc;

    let returnFilesFin = JSON.parse(localStorage.getItem("filesFin"));
    this.singleFileAcc = returnFilesFin;

    let returnFilesBank = JSON.parse(localStorage.getItem("filesBank"));
    this.singleFileBank = returnFilesBank;
  },
  mounted() {
    // this.getFinancialData() {
    //   this.getFinancialData().then(
    //       response => (this.filesAcc = response.data.accountantBalance)
    //   )
    // }

    if (localStorage.bank_statement_period_with) {
      this.state.bank_statement_period_with =
        localStorage.bank_statement_period_with;
    }
    if (localStorage.bank_statement_period_on) {
      this.state.bank_statement_period_on =
        localStorage.bank_statement_period_on;
    }
    if (localStorage.accountant_balance_period_on) {
      this.state.accountant_balance_period_on =
        localStorage.accountant_balance_period_on;
    }
    if (localStorage.accountant_balance_period_with) {
      this.state.accountant_balance_period_with =
        localStorage.accountant_balance_period_with;
    }
    if (localStorage.financial_performance_period_with) {
      this.state.financial_performance_period_with =
        localStorage.financial_performance_period_with;
    }
    if (localStorage.financial_performance_period_on) {
      this.state.financial_performance_period_on =
        localStorage.financial_performance_period_on;
    }
    if (localStorage.filesAcc) {
      this.filesAcc = this.singleFileAcc;
      console.log(this.filesAcc.name);
    }
    if (localStorage.filesFin) {
      this.filesFin = this.singleFileFin;
    }
    if (localStorage.filesBank) {
      this.filesBank = this.singleFileBank;
    }
    // if (localStorage.Acc) {
    //   this.filesAcc = localStorage.getItem('Acc')
    // }
    // if (localStorage.Fin) {
    //   this.filesFin = localStorage.getItem('Fin')
    // }
    // if (localStorage.Bank) {
    //   this.filesBank = localStorage.getItem('Bank')
    // }
  },
  methods: {
    addFilesAccountant() {
      this.$refs.input_file_accountant.click();
      this.seen = !this.seen;
    },
    onFileChangeAcc(e) {
      let input = e.target;
      let fileName = input.files[0].name;
      let fileType = fileName.split(".").pop();
      if (this.files.length < 0) {
        alert("Достигнут лимит по добавлению файлов");
      } else {
        if (fileType !== "pdf") {
          alert("Данный формат файла не подходит");
        } else {
          let reader = new FileReader();
          reader.onload = () => {
            console.log(reader.result);
          };
          this.filesAcc = input.files[0];
          console.log(this.filesAcc, "hello");
          // if(this.filesAcc.size > 1000 * 60) {
          //   alert('Файл весит больше 60 килобайт')
          // }
          this.singleFileAcc = {
            lastMod: this.filesAcc.lastModified,
            lastModDate: this.filesAcc.lastModifiedDate,
            name: this.filesAcc.name,
            size: this.filesAcc.size,
            type: this.filesAcc.type,
          };
          console.log(this.singleFileAcc, "singleFileAcc");
          reader.readAsDataURL(this.filesAcc);
        }
      }
    },
    addFilesFinance() {
      this.$refs.input_file_finance.click();
      this.seenFin = !this.seenFin;
    },
    onFileChangeFinance(e) {
      let input = e.target;
      let fileName = input.files[0].name;
      let fileType = fileName.split(".").pop();
      if (fileType !== "pdf") {
        alert("Данный формат файла не подходит");
      } else {
        let reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          localStorage.setItem("Fin", reader.result);
        };
        this.filesFin = input.files[0];
        this.singleFileFin = {
          lastMod: this.filesFin.lastModified,
          lastModDate: this.filesFin.lastModifiedDate,
          name: this.filesFin.name,
          size: this.filesFin.size,
          type: this.filesFin.type,
        };
        reader.readAsDataURL(this.filesFin);
      }
    },
    addFilesBank() {
      this.$refs.input_file_bank.click();
      this.seenBank = !this.seenBank;
    },
    onFileChangeBank(e) {
      let input = e.target;
      let fileName = input.files[0].name;
      let fileType = fileName.split(".").pop();
      if (fileType !== "pdf") {
        alert("Данный формат файла не подходит");
      } else {
        let reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
        };
        this.filesBank = input.files[0];
        this.singleFileBank = {
          lastMod: this.filesBank.lastModified,
          lastModDate: this.filesBank.lastModifiedDate,
          name: this.filesBank.name,
          size: this.filesBank.size,
          type: this.filesBank.type,
        };
        reader.readAsDataURL(this.filesBank);
      }
    },
    createFinancialData(data) {
      createFinancialData(data).then((res) => {
        console.log(res, "TestFinancial");
      });
    },
    async submitForm() {
      // const isStepCorrect = await this.v$.$validate();
      console.log(this.$refs.input_file_accountant, "inputFiles");
      localStorage.financial_performance_period_on =
        this.state.financial_performance_period_on.toString();
      localStorage.financial_performance_period_with =
        this.state.financial_performance_period_with.toString();
      localStorage.bank_statement_period_on =
        this.state.bank_statement_period_on.toString();
      localStorage.bank_statement_period_with =
        this.state.bank_statement_period_with.toString();
      localStorage.accountant_balance_period_with =
        this.state.accountant_balance_period_with.toString();
      localStorage.accountant_balance_period_on =
        this.state.accountant_balance_period_on.toString();
      localStorage.setItem("filesAcc", JSON.stringify(this.singleFileAcc));
      localStorage.setItem("filesFin", JSON.stringify(this.singleFileFin));
      localStorage.setItem("filesBank", JSON.stringify(this.singleFileBank));
      let data = new FormData();
      data.append("accountant_balance", this.filesAcc);
      data.append("financial_performance", this.filesFin);
      data.append("bank_statement", this.filesBank);
      data.append(
        "financial_performance_period_with",
        JSON.stringify(this.state.financial_performance_period_with.toString())
      );
      data.append(
        "bank_statement_period_with",
        JSON.stringify(this.state.bank_statement_period_with.toString())
      );
      data.append(
        "accountant_balance_period_with",
        JSON.stringify(this.state.accountant_balance_period_with.toString())
      );
      data.append(
        "bank_statement_period_on",
        JSON.stringify(this.state.financial_performance_period_on.toString())
      );
      data.append(
        "financial_performance_period_on",
        JSON.stringify(this.state.bank_statement_period_on.toString())
      );
      data.append(
        "accountant_balance_period_on",
        JSON.stringify(this.state.accountant_balance_period_on.toString())
      );
      this.createFinancialData(data);
      this.$emit("btnNext");
      // if (isStepCorrect) {
      //   alert("Form successfully submitted.");
      // } else {
      //   alert("Form failed validation");
    },
  },
  computed: {
    // AddAccFiles() {
    //   console.log(this.filesAcc, "computed1");
    //   return this.filesAcc.name;
    // },
    // AddFinFiles() {
    //   console.log(this.filesFin, "computed2");
    //   return this.filesFin.name;
    // },
    // AddBankFlies() {
    //   console.log(this.filesBank, "computed3");
    //   return this.filesBank.name;
    // },
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
    overflow: hidden;
    & > div {
      margin-bottom: 26px;
    }
  }
}
.inputAccountant {
  height: 45px;
  & > .input-container {
    height: 30px;
  }
  & > .title {
    @include titleText;
  }
  &.error {
    position: relative;
    color: $error-color;
    & > .input-container {
      padding-right: 40px;
    }
    & > .title {
      color: $error-color;
    }
    & > .error-container {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border-bottom: 1px solid $black-color;
  padding: 0 5px;
  position: relative;
  &.flexStart {
    justify-content: flex-start;
    height: 35px;
  }
  & > .title {
    @include text;
    cursor: pointer;
    display: flex;
    align-items: center;
    & > img {
      margin-right: 10px;
    }
  }
  & > .input {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
  }
}

@media (max-width: $tablet) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: max-content;
    grid-column-gap: 66px;
    & > :first-child {
      grid-column: 1/3;
      margin-bottom: 66px;
    }
  }
}
@media (max-width: $mobile) {
  .grid {
    grid-template-columns: 1fr;
    margin-bottom: 40px;
    height: 100%;
    overflow: auto;
    border-bottom: 1px solid #e6e2e2;
    & > .sub-grid {
      & > div {
        margin-bottom: 13px;
      }
    }

    & > :first-child {
      grid-column: 1/2;
      margin-bottom: 40px;
    }
  }
}
</style>
