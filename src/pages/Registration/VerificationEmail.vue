<template>
  <ContentWrapper small>
    <Heading center text="Подтверждение учетной записи" />
    <div>
      Ваша почта была успешно подтверждена. Вы будете перенаправлены через
      секунду...
    </div>
  </ContentWrapper>
</template>

<script>
import ContentWrapper from "@/components/ContentWrapper.vue";
import Heading from "@/components/Heading.vue";
import { verifyByEmail } from "../../api/auth";

export default {
  name: "VerificationEmail",
  components: {
    ContentWrapper,
    Heading,
  },
  data() {
    return {};
  },
  methods: {
    verifyByEmail(data) {
      verifyByEmail(data).then((res) => {
        // this.$store.commit("LOGIN_SUCCESS", res.login_data.token);
        if (res.status === 200) {
          this.$router.push({ name: "Login" });
        } else {
          this.$router.push({ name: "Login" })
        }
      });
    },
  },
  created() {
    let data = {
      userId: this.$route.params.userId,
      expires: this.$route.query.expires,
      signature: this.$route.query.signature,
    };
    this.verifyByEmail(data);
  },
};
</script>

<style scoped lang="scss">
@import "/../../styles/variables";
@import "/../../styles/mixins";

.inputs-container {
  @include bodyPadding;
  @include gridInputsMargin;
}
@media (max-width: $mobile) {
  .inputs-container {
    margin-bottom: 28px;
  }
}
</style>
