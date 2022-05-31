<template>
  <ContentWrapper>
    <Heading text="Внесите данные руководителя (-ей)" />
    <div class="grid">
      <div class="inputs-container">
        <InputText
          title="Должность"
          v-model="state.job"
          :class="{ error: v$.job.$error }"
          :error="!!v$.job.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Фамилия"
          v-model="state.bossLastName"
          :class="{ error: v$.bossLastName.$error }"
          :error="!!v$.bossLastName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Имя"
          v-model="state.bossFirstName"
          :class="{ error: v$.bossFirstName.$error }"
          :error="!!v$.bossFirstName.$error"
          error-text="Проверьте правильность введенных данных"
        />
        <InputText
          title="Отчество"
          v-model="state.bossPatronymic"
          :class="{ error: v$.bossPatronymic.$error }"
          :error="!!v$.bossPatronymic.$error"
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
        type="submit"
        text="Далее"
        @click="submitForm"

      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper";
import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import ButtonsContainer from "../../../components/ButtonsContainer.vue";
import InputText from "../../../components/InputText";
import { createLeader } from "../../../api/borrower";
import { computed, reactive } from "vue";
import { minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { regexOnlyRus } from "@/utils/heplers";

export default {
  setup() {
    const state = reactive({
      job: "",
      bossLastName: "",
      bossFirstName: "",
      bossPatronymic: "",
      bossConfirmFiles: [],
      bosses: [],
    });
    const rules = computed(() => {
      return {
        job: { required, $autoDirty: true },
        bossLastName: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
          regexOnlyRus
        },
        bossFirstName: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
          regexOnlyRus
        },
        bossPatronymic: {
          minLength: minLength(3),
          $autoDirty: true,
          regexOnlyRus
        },
      };
    });
    return { state, v$: useVuelidate(rules, state) };
  },
  name: "CreateLeader",
  components: {
    ContentWrapper,
    Heading,
    Button,
    InputText,
    ButtonsContainer,
  },
  data() {
    return {
      files: [],
      errorFile: false,
      FlexStart: false,
      file: {},
      localStorage: [],
    };
  },
  computed: {},
  created() {
    var returnBosses = JSON.parse(localStorage.getItem("this.bosses") || "[]");
    this.state.bosses = returnBosses;
    var returnFiles = JSON.parse(localStorage.getItem("files"));
    this.file = returnFiles;
  },
  mounted() {
    if (localStorage.job) {
      this.state.job = localStorage.job;
    }
    if (localStorage.bossLastName) {
      this.state.bossLastName = localStorage.bossLastName;
    }
    if (localStorage.bossFirstName) {
      this.state.bossFirstName = localStorage.bossFirstName;
    }
    if (localStorage.bossPatronymic) {
      this.state.bossPatronymic = localStorage.bossPatronymic;
    }
    if (localStorage.files) {
      this.files = this.file;
    }
  },
  methods: {
    addFiles() {
      this.$refs.files.click();
    },
    createLeader(data) {
      createLeader(data).then((res) => {
        localStorage.setItem('id_create_leader', res.id)
        console.log(res, "test_leader");
        this.$emit("btnNext");
      });
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      let fileName = uploadedFiles[0].name;
      let fileType = fileName.split(".").pop();
      if (fileType !== "pdf") {
        alert("Данный формат файла не подходит");
      } else {
        console.log(uploadedFiles, "uploaded");
        for (var i = 0; i < uploadedFiles.length; i++) {
          this.file = {
            lastMod: uploadedFiles[i].lastModified,
            lastModDate: uploadedFiles[i].lastModifiedDate,
            name: uploadedFiles[i].name,
            size: uploadedFiles[i].size,
            type: uploadedFiles[i].type,
          };
          // if(this.files.length <5) {
          this.files.push(uploadedFiles[i]);
          this.localStorage.push(this.file);
          // } else {
          //  alert ('Достигнут лимит по добавлению файлов')
          // }
        }
      }
    },
    removeFile(index) {
      this.files.splice(index, 1);
      console.log(this.files);
    },
    async submitForm() {
      const isStepCorrect = await this.v$.$validate();
      localStorage.setItem("files", JSON.stringify(this.localStorage));
      console.log(JSON.stringify(this.localStorage));
      const secondParsed = JSON.stringify(this.state.bosses);
      localStorage.setItem("this.bosses", secondParsed);
      localStorage.job = this.state.job;
      localStorage.bossFirstName = this.state.bossFirstName;
      localStorage.bossLastName = this.state.bossLastName;
      localStorage.bossPatronymic = this.state.bossPatronymic;
      let data = {
        first_name: this.state.bossFirstName,
        last_name: this.state.bossLastName,
        patronymic: this.state.bossPatronymic,
        position: this.state.job,
      };
      this.createLeader(data);
      if (isStepCorrect) {
        console.log("Form successfully submitted.");
      } else {
        console.log("Form failed validation");
      }
    },

    addBoss() {
      this.state.bosses.push(
        this.state.bossLastName +
          ` ` +
          this.state.bossFirstName +
          ` ` +
          this.state.bossPatronymic
      );
    },
    removeBoss(index) {
      this.state.bosses.splice(index, 1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  display: grid;
  grid-template-columns: 0.9fr repeat(2, 1fr);
  grid-column-gap: 99px;
  width: 100%;
  max-height: 260px;
  @include bodyPadding;
  & > .inputs-container {
    @include gridInputsMargin;
  }
}

@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr 1.1fr;
    grid-row-gap: 60px;
    grid-column-gap: 60px;
    grid-template-rows: 260px 1fr;
    overflow: hidden;
    height: 100%;
    max-height: unset;
    margin-bottom: 60px;
  }
}

.inputFile-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  border-bottom: 1px solid $black-color;
  padding: 0 5px;
  position: relative;
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

@media (max-width: $mobile) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr 1fr;
    grid-row-gap: 35px;
    overflow: auto;
    height: 100%;
    margin-bottom: 30px;
    padding-bottom: 13px;
    border-bottom: 1px solid #e6e2e2;
  }
}
</style>
