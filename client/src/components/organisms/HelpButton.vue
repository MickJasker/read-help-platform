<template>
  <section class="help-button">
    <div class="wrapper">
      <img
        src="@/assets/svg/share.svg"
        @click="$emit('help')"
      >
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
    transition: 0.1s ease-out;

    img {
      padding: 3rem 0;
      filter: drop-shadow(0 1rem 2rem rgba(black, 0.15));
    }

    &:active {
      opacity: 0.75;
    }
  }
</style>
