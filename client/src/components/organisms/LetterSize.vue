<template>
  <section class="letter-size">
    <div class="wrapper">
      <img src="@/assets/svg/letter-size.svg">
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'LetterSize',
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
