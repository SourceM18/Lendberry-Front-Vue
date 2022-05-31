<template>
  <ContentWrapper>
    <Heading text="Внесите данные учредителей" is-download/>
    <div class="grid">
      <div class="input-container">
        <InputText
          title="Фамилия"
          v-model="state.founderLastName"
          :class="{ error: v$.founderLastName.$error }"
          :error="!!v$.founderLastName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Имя"
          v-model="state.founderFirstName"
          :class="{ error: v$.founderFirstName.$error }"
          :error="!!v$.founderFirstName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Отчество"
          v-model.number="state.founderPatronymic"
          :class="{ error: v$.founderPatronymic.$error }"
          :error="!!v$.founderPatronymic.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Доля участия, в процентах"
          v-model="state.fraction_percent"
          type="number"
          :class="{ error: v$.fraction_percent.$error }"
          :error="!!v$.fraction_percent.$error"
          v-on:keyup="changePercentToMoney"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Доля участия, в рублях"
          v-model.number="state.fraction_rubles"
          type="number"
          :class="{ error: v$.fraction_rubles.$error }"
          :error="!!v$.fraction_rubles.$error"
          v-on:keyup="changeMoneyToPercent"
          error-text="Проверьте правильность введенных данных"
        />
      </div>
      <div class="right-block">
        <SubHeading text="Учредители" />
        <ListContainer>
          <ListItem
            delItem
            tdelItem
            v-for="founder in state.founders"
            :key="founder.name"
            :text="founder"
            @click="removeFounder"
          ></ListItem>
        </ListContainer>
        <InputAdd
          id="id2"
          type="button"
          title="Добавить учредителя"
          @click.prevent="addFounder"
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
        @click="submitForm"
        :disabled="v$.$invalid || this.state.founders.length === 0"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import Button from "../../../components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import InputText from "../../../components/InputText.vue";
import SubHeading from "../../../components/SubHeading.vue";
import ListContainer from "../../../components/ListContainer.vue";
import ListItem from "../../../components/ListItem.vue";
import InputAdd from "../../../components/InputAdd.vue";
import { createFounder } from "../../../api/borrower";
import { computed, reactive } from "vue";
import { between, minLength, numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { regexOnlyRus } from "@/utils/heplers";

// let capital = localStorage.authorizedCapital;
// capital = Number(capital);

const authorizedCapital = localStorage.authorizedCapital;

export default {
  setup() {
    const state = reactive({
      founderLastName: "",
      founderFirstName: "",
      founderPatronymic: "",
      fraction_percent: null,
      fraction_rubles: null,
      test: null,
      file: null,
      founderConfirmFiles: [],
      founders: [],
    });
    const rules = computed(() => {
      return {
        founderLastName: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
          regexOnlyRus
        },
        founderFirstName: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
          regexOnlyRus
        },
        founderPatronymic: {
          required,
          minLength: minLength(2),
          $autoDirty: true,
          regexOnlyRus
        },
        fraction_percent: {
          required,
          minLength: minLength(1),
          $autoDirty: true,
          numeric,
          between: between(1, 100)
        },
        fraction_rubles: {
          required,
          minLength: minLength(1),
          $autoDirty: true,
          numeric,
          between: between(1, authorizedCapital)
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "Step6",
  components: {
    ContentWrapper,
    Heading,
    Button,
    InputText,
    SubHeading,
    ListContainer,
    ListItem,
    InputAdd,
    ButtonsContainer,
  },
  created() {
    let returnFounders = JSON.parse(
      localStorage.getItem("this.founders") || "[]"
    );
    this.state.founders = returnFounders;
  },
  mounted() {
    if (localStorage.founderLastName) {
      this.state.founderLastName = localStorage.founderLastName;
    }
    if (localStorage.founderFirstName) {
      this.state.founderFirstName = localStorage.founderFirstName;
    }
    if (localStorage.founderPatronymic) {
      this.state.founderPatronymic = localStorage.founderPatronymic;
    }
    if (localStorage.fraction_percent) {
      this.state.fraction_percent = localStorage.fraction_percent;
    }
    if (localStorage.fraction_rubles) {
      this.state.fraction_rubles = localStorage.fraction_rubles;
    }
  },
  methods: {
    createFounder(data) {
      createFounder(data).then((res) => {
        console.log(res, "Test_Founder");
        this.$emit("btnNext");
      });
    },
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      localStorage.founderFirstName = this.state.founderFirstName;
      localStorage.founderLastName = this.state.founderLastName;
      localStorage.founderPatronymic = this.state.founderPatronymic;
      localStorage.fraction_percent = this.state.fraction_percent;
      localStorage.fraction_rubles = this.state.fraction_rubles;
      const parsed = JSON.stringify(this.state.founders);
      localStorage.setItem("this.founders", parsed);
      if (isStepCorrect) {
        console.log("Form successfully submitted.");
        let data = {
          first_name: this.state.founderFirstName,
          last_name: this.state.founderLastName,
          patronymic: this.state.founderPatronymic,
          fraction_percent: this.state.fraction_percent,
          fraction_rubles: this.state.fraction_rubles,
        };
        this.createFounder(data);
      } else {
        console.log("Form failed validation");
      }
    },
    addFounder() {
      this.state.founders.push(
        this.state.founderLastName +
          ` ` +
          this.state.founderFirstName +
          ` ` +
          this.state.founderPatronymic
      );
      // this.state.founderLastName = "";
      // this.state.founderFirstName = "";
      // this.state.founderPatronymic = "";
    },
    removeFounder(index) {
      this.state.founders.splice(index, 1);
    },
    updatePercent() {
      let capital = localStorage.authorizedCapital;
      capital = Number(capital);
      return (this.state.fraction_rubles = capital);
    },
    changePercentToMoney(e){
      this.state.fraction_rubles = (authorizedCapital / 100 * e.target.value).toFixed(2);
    },
    changeMoneyToPercent(e){
      this.state.fraction_percent = (e.target.value / 10000 * authorizedCapital).toFixed(2);
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    // fractionRoublesSummary: {
    //   // eslint-disable-next-line vue/return-in-computed-property
    //   get: function () {
    //     if (this.state.fraction_rubles <= capital) {
    //       return ((this.state.fraction_rubles / capital) * 100).toFixed(2);
    //     }
    //   },
    //   set: function () {
    //     if (this.state.fraction_rubles <= capital) {
    //       this.fractionRoublesSummary = this.state.fraction_percent;
    //     }
    //   },
    // },
    // fractionPercentSummary: {
    //   // eslint-disable-next-line vue/return-in-computed-property
    //   get: function () {
    //     if (this.state.fraction_percent <= 100) {
    //       return (
    //         ((capital * this.state.fraction_percent) / capital) *
    //         100
    //       ).toFixed(2);
    //     }
    //   },
    //   set: function () {
    //     this.fractionPercentSummary = this.state.fraction_rubles;
    //   },
    // },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";
.content-wrapper {
  max-width: 789px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  overflow: hidden;
  grid-column-gap: 93px;
  max-height: 330px;
  height: 100%;
  @include bodyPadding;
  & > .input-container {
    @include gridInputsMargin;
  }
  & > .right-block {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    grid-row-gap: 65px;
    max-height: unset;
    margin-bottom: 60px;

    & > .input-container {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 60px;
      & > :nth-child(1) {
        grid-column: 1/2;
        grid-row: 1/2;
      }
      & > :nth-child(2) {
        grid-column: 1/2;
        grid-row: 2/3;
      }
      & > :nth-child(3) {
        grid-column: 1/2;
        grid-row: 3/4;
      }
    }
    & > .right-block {
      height: 100%;
    }
  }
}
@media (max-width: $mobile) {
  .grid {
    margin-bottom: 40px;
    grid-row-gap: 40px;
    .input-container {
      grid-template-columns: 1fr;
    }
  }
}
@media (max-width: 320px) {
  .grid {
    margin-bottom: 20px;
    grid-row-gap: 20px;
    .input-container {
      grid-template-columns: 1fr;
    }
  }
}
</style>
