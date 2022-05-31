<template>
  <div class="buttons-container"><slot /></div>
</template>

<script>
export default {
  name: "ButtonsContainer",
};
</script>

<style scoped lang="scss">
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}
</style>
