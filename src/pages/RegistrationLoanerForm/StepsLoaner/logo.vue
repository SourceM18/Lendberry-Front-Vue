<template>
  <ContentWrapper small>
    <Heading center text="Загрузите логотип (при наличии)" />
    <div class="inputs-container">
      <div class="logo-container">
        <label @click.self.prevent="addFiles()" for="my-file" v-if="!preview"
          >Добавить <br />
          <br />
          <span>400х400рх</span>
          <input
            type="file"
            accept="image/*"
            @change="previewImage"
            class="form-control-file"
            ref="myfile"
            id="my-file"
          />
        </label>
        <div class="logo-company" v-if="preview">
          <img alt="" :src="preview" @click="reset" />
          <div class="del-btn" @click="reset">
            Удалить <br />
            логотип
          </div>
        </div>
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
        @click="submitForm()"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import { updateBorrower } from "../../../api/borrower";
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import ButtonsContainer from "@/components/ButtonsContainer.vue";
import Button from "@/components/Button.vue";

export default {
  name: "logo",
  components: {
    ContentWrapper,
    Heading,
    ButtonsContainer,
    Button,
  },
  data() {
    return {
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
    };
  },
  mounted() {
    if (localStorage.image) {
      this.image = localStorage.getItem("image");
      this.preview = localStorage.getItem("image");
    }
  },
  methods: {
    // uploadImage(data) {
    //   uploadImage(data).then((res) => {
    //     console.log(res, "testUpload");
    //     if (this.image === null) {
    //       alert("Добавьте пожалуйста файл");
    //     } else {
    //       this.$emit("btnNext");
    //     }
    //   });
    // },
    // updateBorrower(data) {
    //   updateBorrower(data).then((res) => {
    //     console.log(res, "testUpdateBorrower");
    //   });
    // },
    updateBorrower(data) {
      updateBorrower(data).then((res) => {
        console.log(res, "testUpdate");
        // if (this.image === null) {
        //   alert("Добавьте пожалуйста файл");
        // } else {
          this.$emit("btnNext");
        // }
      });
    },
    addFiles(e) {
      this.$refs.myfile.click();
      e.preventDefault();
    },
    previewImage: function (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          localStorage.setItem("image", this.preview);
        };
        reader.readAsDataURL(input.files[0]);
        this.image = input.files[0];
      }
    },
    reset: function () {
      this.image = null;
      this.preview = null;
      localStorage.removeItem("image");
    },

    async submitForm() {
      let updateData = new FormData();
      updateData.append("logo", this.preview);
      this.updateBorrower(updateData);
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";
.inputs-container {
  margin-bottom: 40px;
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 320px;
  border: 2px solid $blue-color;
  border-radius: 20px;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  position: relative;
  margin: auto;
  overflow: hidden;
  background-color: $white-color;

  & > label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: url("../../../assets/ico/company-logo.svg") no-repeat;
    background-position: center 37%;

    & > span {
      font-size: 18px;
      line-height: 20px;
    }

    & > input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
  & > .logo-company {
    width: 80%;
    height: 80%;

    & > img {
      width: 100%;
      height: 100%;
    }
    & > .del-btn {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
      background: #ffffffcc;
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover {
      & > .del-btn {
        opacity: 1;
      }
    }
  }
}
@media (max-width: $mobile) {
  .logo-container {
    width: 200px;
    height: 200px;
    font-size: 18px;
    line-height: 21px;
    & label {
      background-size: 50%;
      & > span {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}

@media (max-width: $mobile) {
  .inputs-container {
    margin-bottom: 30px;
  }
}
</style>
