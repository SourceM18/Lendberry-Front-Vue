<template>
  <ContentWrapper>
    <Heading text="Подтверждающие файлы" is-faq/>
    <div class="inputs-container">
      <ListContainer>
        <ListItem
          v-for="(file, index) in files"
          delItem
          :text="file.name"
          :key="index"
          v-on:click="removeFile(index)"
        />
      </ListContainer>
      <div class="inputFile-container" :class="{ flexStart: flexStart }">
        <label id="input" class="title" v-on:click="addFiles()">
          <img alt="" v-if="errorFile" src="../../../assets/ico/Backet.svg" />
          <img alt="" v-else src="../../../assets/ico/Add.svg" /> Добавить
          файл</label
        >
        <input
          class="input"
          type="file"
          id="files"
          ref="files"
          accept="application/pdf"
          multiple
          v-on:change="handleFilesPassUpload()"
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
        type="submit"
        :disabled="this.files.length === 0"
        @click.self.prevent="sendFiles"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import Button from "../../../components/Button";
import ButtonsContainer from "../../../components/ButtonsContainer";
import ListContainer from "../../../components/ListContainer.vue";
import ListItem from "../../../components/ListItem.vue";
import { uploadBorrowerPassportFiles } from "@/api/borrower";

export default {
  name: "UploadFilesLeader",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    ListContainer,
    ListItem,
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
  created() {
    let returnFiles = JSON.parse(localStorage.getItem("passportBorFiles"));
    this.file = returnFiles;
  },
  mounted() {
    if (localStorage.passportBorFiles) {
      this.files = this.file;
    }
  },
  methods: {
    addFiles() {
      this.$refs.files.click();
    },
    uploadBorrowerFiles(data) {
      uploadBorrowerPassportFiles(data).then((res) => {
        console.log("res", res);
        this.$emit("btnNext");
      });
    },
    handleFilesPassUpload() {
      let uploadedFiles = this.$refs.files.files;
      console.log(uploadedFiles[0], "uploaded");
      let fileName = uploadedFiles[0].name;
      let fileType = fileName.split(".").pop();
      if (fileType !== "pdf") {
        alert("Данный формат файла не подходит");
      } else {
        for (let i = 0; i < uploadedFiles.length; i++) {
          this.file = {
            lastMod: uploadedFiles[i].lastModified,
            lastModDate: uploadedFiles[i].lastModifiedDate,
            name: uploadedFiles[i].name,
            size: uploadedFiles[i].size,
            type: uploadedFiles[i].type,
          };
          this.files.push(uploadedFiles[i]);
          this.localStorage.push(this.file);
        }
      }
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    sendFiles() {
      let data = new FormData();
      localStorage.setItem("passportBorFiles", JSON.stringify(this.localStorage));
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        let passportBorFiles = this.$refs.files.files[i];
        data.append("file", passportBorFiles);
      }
      data.append("leader_id", localStorage.getItem('id_create_leader'))
      console.log('data send', data)
      this.uploadBorrowerFiles(data);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.inputs-container {
  @include bodyPadding;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  margin-bottom: 49px;
  overflow: hidden;

  & > .list-container {
    flex-grow: 1;
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
  .inputs-container {
    margin-bottom: 28px;
  }
}
</style>