<template>
  <ContentWrapper>
    <Heading text="Внесите данные для регистрации" />
    <div className="grid">
      <div class="sub-grid">
        <Select title="Организационно-правовая форма">
          <ListItem text="Форма 1" />
        </Select>
        <InputText title="Наименование" />
        <InputText title="Сокращенное наименование" />
        <InputText title="Адрес электронной почты" />
        <InputText title="Бренд / маркетинговое наименование" />
      </div>
      <div class="sub-grid">
        <InputText title="ИНН" />
        <Calendar title="Дата регистрации" />
        <InputText title="Юридический адрес" />
        <Checkbox
          id="id1"
          title="Почтовый адрес совпадает с юридическим адресом"
        />
        <InputText title="Почтовый адрес" />
      </div>
      <div class="sub-grid">
        <InputText title="ОКПО" />
        <CompanyLogo />
      </div>
    </div>
    <ButtonsContainer>
      <Button text="Назад" v-on:click="this.$emit('btnBack')" />
      <Button text="Далее" v-on:click="this.$emit('btnNext')" />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import InputText from "@/components/InputText.vue";
import Select from "@/components/Select.vue";
import ListItem from "@/components/ListItem.vue";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";
import Calendar from "@/components/Calendar.vue";
import ButtonsContainer from "@/components/ButtonsContainer.vue";
import CompanyLogo from "@/components/CompanyLogo.vue";

export default {
  name: "Step2-2",
  components: {
    ContentWrapper,
    Heading,
    Button,
    InputText,
    Select,
    ListItem,
    Checkbox,
    Calendar,
    ButtonsContainer,
    CompanyLogo,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/variables";
@import "src/styles/mixins";

.grid {
  @include gridInputsMargin;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 99px;
  @include bodyPadding;

  & > .sub-grid {
    @include gridInputsMargin;
  }
  .logo-container {
    width: 210px;
    height: 210px;
    margin: auto 0 0 auto;
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
    .logo-container {
      margin: auto;
    }
  }
}
</style>
