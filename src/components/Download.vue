<template>
  <div class="download">
    <a href="testDownload.docx" download>
      <img class="download-img" src="../assets/ico/Download.svg" alt="download">
    </a>
  </div>
</template>

<script>
export default {
  name: "Download"
};
</script>

<style scoped lang="scss">
.download {
  &-img{
    height: 19px;
    width: auto;
  }
}
</style>