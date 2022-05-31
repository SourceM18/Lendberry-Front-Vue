<template>
  <ContentWrapper>
    <Heading text="Укажите сферы деятельности" is-faq/>
    <div class="grid">
      <div>
        <SubHeading text="Справочник сфер деятельности" />
        <InputSearch v-model="state.search" />
        <ListContainer>
          <ListItem
            v-for="field in areasByTitle"
            v-bind:key="field.id"
            v-bind:text="field.description"
            @click="addFromList(field)"
            addItem
          />
        </ListContainer>
      </div>
      <div>
        <SubHeading text="Выбранные сферы деятельности" />
        <ListContainer class="margin-top">
          <ListItem
            v-for="areaNew in completedAreas"
            :key="areaNew.id"
            v-bind:text="areaNew.description"
            @click="removeFromList(areaNew)"
            delItem
          />
        </ListContainer>
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
        :disabled="this.completedAreas.length === 0"
        @click="submitForm"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "../../../components/ContentWrapper.vue";
import Heading from "../../../components/Heading.vue";
import SubHeading from "../../../components/SubHeading.vue";
import ListContainer from "../../../components/ListContainer.vue";
import ListItem from "../../../components/ListItem.vue";
import InputSearch from "../../../components/InputSearch.vue";
import Button from "../../../components/Button";
import ButtonsContainer from "../../../components/ButtonsContainer";
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      areas: [
        {
          id: 1,
          description:
            "Сфера деятельности компаний горнодобывающей промышленности",
          completed: false,
        },
        {
          id: 2,
          description:
            "Сфера деятельности компаний обрабатывающей промышленности",
          completed: false,
        },
        {
          id: 3,
          description:
            "Сфера деятельности компаний производства текстильных изделий",
          completed: false,
        },
        {
          id: 4,
          description:
            "Сфера деятельности компаний производства химических продуктов",
          completed: false,
        },
        {
          id: 5,
          description: "Сфера деятельности компаний в области строительства",
          completed: false,
        },
        {
          id: 6,
          description:
            "Сфера деятельности компаний оптовой и розничной торговли",
          completed: false,
        },
      ],
      completeAreas: [],
      search: "",
      selectedAreaId: null,
    });
    return { state };
  },
  name: "Step3",
  components: {
    ContentWrapper,
    Heading,
    Button,
    SubHeading,
    ListContainer,
    ListItem,
    InputSearch,
    ButtonsContainer,
  },
  data() {
    return {};
  },
  computed: {
    selected() {
      return this.$store.getters.GET_SELECTED;
    },
    completedAreas: function () {
      return this.state.completeAreas.filter((field) => field.completed);
    },
    areasByTitle() {
      return this.state.areas.filter(
        (field) => field.description.indexOf(this.state.search) !== -1
      );
    },
  },

  mounted() {
    if (this.state.completeAreas.length === 0) {
      this.state.completeAreas = this.state.areas;
    }
  },
  created() {
    let returnArea = JSON.parse(
      localStorage.getItem("this.completedAreas") || "[]"
    );
    if (returnArea.length !== 0) {
      this.state.areas = returnArea;
    }
    console.log(returnArea, "returnArea");
  },
  methods: {
    async submitForm() {
      const parsed = JSON.stringify(this.state.areas);
      localStorage.setItem("this.completedAreas", parsed);
      if (this.completedAreas.length === 0) {
        console.log("Проверьте что был выбран справочник.");
      } else {
        if (this.$store.state.selected === "ИП") {
          this.$emit("btnNextIp");
        } else {
          this.$emit("btnNext");
        }
      }
    },
    removeFromList(areaNew) {
      this.state.completeAreas.findIndex(
        (i) => i.completed === areaNew.completed
      );
      areaNew.completed = false;
    },
    addFromList(field) {
      this.state.areas.findIndex((i) => i.completed === field.completed);
      field.completed = true;
      console.log(this.state.areas[0].completed, "areas");
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 15%;
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  overflow: hidden;
  @include bodyPadding;

  & .margin-top {
    margin-top: 26px;
  }
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: $tablet) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 70px;
    margin-bottom: 66px;

    & .margin-top {
      margin-top: unset;
    }
  }
}
@media (max-width: $mobile) {
  .grid {
    grid-row-gap: 40px;
    margin-bottom: 40px;
  }
}
</style>
