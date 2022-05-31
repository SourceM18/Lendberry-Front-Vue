<template>
  <ContentWrapper>
    <Heading text="Правила платформы" />
    <div class="inputs-container">
      <ListContainer>
        <p>1. Функциональность приложения</p>
        <p>
          1.1. Приложение не должно обманывать пользователей. Не стоит обещать
          бесплатные голоса или просмотр гостей страницы.
        </p>
        <p>
          1.2. Приложение не должно содержать функций, при работе с которыми
          пользователь нарушает Правила пользования Социальной Сетью ВКонтакте
          (https://vk.com/terms). Например, приложение для помощи в накрутке
          лайков — плохая идея.
        </p>
        <p>
          1.3. В Приложении не должно быть ссылок, опасных для пользователей.
          Все переходы по ссылкам должны быть предсказуемы. Если в Вашем
          приложении много разных ссылок от пользователей, используйте метод
          utils.checkLink, чтобы проверить их безопасность.
        </p>
        <p>
          1.4. Приложение не может быть выдано за официальный продукт
          разработчиков ВКонтакте. В том числе, запрещается задействовать
          логотип, подарки или стикеры ВКонтакте в оформлении, использовать
          название ВКонтакте в названии или описании Приложения, если иное не
          оговорено отдельным дополнительным соглашением.
        </p>
        <p>
          1.5. Нельзя резко изменять суть и название приложения. Если есть такая
          необходимость, зарегистрируйте новое. Пользователи будут неприятно
          удивлены, обнаружив у себя в списке какое-то незнакомое приложение.
        </p>
        <p>
          1.6. Нельзя предоставлять возможность скачивать контент (например,
          аудиозаписи, видеозаписи, изображения, документы и иной контент) с
          серверов ВКонтакте за рамками предоставляемой Социальной Сетью
          ВКонтакте функциональности с целью предоставления доступа к контенту в
          оффлайн-режиме или создания с использованием такого контента
          автономных хранилищ. Это нарушает интересы Администрации Сайта,
          пользователей и(или) правообладателей.
        </p>
        <p>
          1.7. Приложение не должно содержать сторонних библиотек, фрагментов
          кода, не имеющих прямого отношения к его функционированию, в том числе
          эксплуатирующих вычислительные мощности устройства пользователя без
          его ведома. Тайком майнить криптовалюту — нельзя.
        </p>
      </ListContainer>
    </div>
    <div class="checkbox">
      <input id="terms" type="checkbox" value="agree" v-model="terms" />
      <label for="terms">
        <p class="text">Согласен с <span> Правилами Платформы</span></p>
      </label>
    </div>
    <ButtonsContainer>
      <Button text="Назад" v-on:click="this.$emit('btnBack')" />
      <Button
        text="Далее"
        @click="onNextStep"
        :disabled="this.terms === false"
      />
    </ButtonsContainer>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import Button from "@/components/Button";
import ButtonsContainer from "@/components/ButtonsContainer";
import ListContainer from "@/components/ListContainer.vue";

export default {
  name: "Step2",
  components: {
    ContentWrapper,
    Heading,
    Button,
    ButtonsContainer,
    ListContainer,
  },
  data() {
    return {
      terms: false,
      type: localStorage.type
    };
  },
  methods: {
    onNextStep() {
      localStorage.privacy_policy_accepted = this.terms;
      if(this.type === 'investor') {
        this.$router.push({ name: "RegistrationPhone" });
      } else {
        this.$emit("btnNext");
      }
    },
  },
  // mounted() {
  //   if (localStorage.privacy_policy_accepted) {
  //     this.terms=localStorage.privacy_policy_accepted
  //   }
  // }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.content-wrapper {
  max-width: 789px;
  & > .checkbox {
    margin: 22px 0 30px;
  }
  & .text {
    font-size: 18px;
    line-height: 21px;
    & > span {
      color: $active-color;
      font-weight: 700;
    }
  }
}
.checkbox {
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
    width: 0px;
    height: 0px;
    opacity: 0;
    position: absolute;
  }
}
@media (max-width: $mobile) {
  .checkbox {
    height: 33px;
    & > label {
      &::before {
        width: 14px;
        height: 14px;
      }
    }
  }
}
.inputs-container {
  @include bodyPadding;
  height: 100%;
  & p {
    margin: 10px 0 16px;
    scroll-snap-align: start;
    font-size: 18px;
    line-height: 21px;
  }
}

@media (max-width: $mobile) {
  .content-wrapper {
    & > .checkbox {
      margin: 17px 0 30px;
    }
    & .text {
      font-size: 12px;
      line-height: 14px;
    }
  }
  .inputs-container {
    & p {
      margin-bottom: 7px 0 7px;
      font-size: 12px;
      line-height: 13px;
    }
  }
}
</style>
