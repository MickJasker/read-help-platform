<template>
  <section class="help-button">
    <div class="wrapper">
      <img src="@/assets/svg/help.svg">
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HelpButton',
};
</script>

<style scoped lang="scss">
  .wrapper {
    max-width: 80%;
    margin: 0 auto;
    img {
      padding: 3rem 0;
    }
  }
</style>
