<template>
  <div class="logo-container" :class="investor ? 'investor' : 'borrower'">
    <label for="photo" v-if="inputPhoto">
      <p v-if="investor">
        Добавить<br />
        аватар<br />
        <span>400х400рх</span>
      </p>
      <p v-else>
        Добавить<br />
        логотип<br />
        <span>400х400рх</span>
      </p>
      <input id="photo" type="file" accept="image/*" @change="onFileChange" />
    </label>

    <div class="logo-company" v-else>
      <img :src="image" />
      <div class="del-btn" @click="removeImage">
        <p v-if="investor">
          Удалить <br />
          аватар
        </p>
        <p v-else>
          Удалить <br />
          логотип
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyLogo",

  props: {
    investor: Boolean,
  },

  data() {
    return {
      inputPhoto: true,
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      // eslint-disable-next-line no-unused-vars
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    // eslint-disable-next-line no-unused-vars
    removeImage: function (e) {
      this.image = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";

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

    & > span {
      font-size: 18px;
      line-height: 20px;
    }

    & > input {
      opacity: 0;
      width: 0px;
      height: 0px;
    }
  }
  & > .logo-company {
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
  &.borrower {
    & > label {
      background: url("../assets/ico/company-logo.svg") no-repeat;
      background-position: center 37%;
    }
    & > .logo-company {
      width: 80%;
      height: 80%;
    }
  }
  &.investor {
    & > label {
      background: url("../assets/ico/Human.png") no-repeat;
      background-size: 50% auto;
      background-position: center;
    }
    & > .logo-company {
      width: 100%;
      height: 100%;

      & > img {
        object-fit: cover;
        object-position: center;
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
</style>
