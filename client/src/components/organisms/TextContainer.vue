<template>
  <section class="text-container">
    <p>
      <slot />
    </p>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'TextContainer',
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: center;
  p {
    max-width: 80%;
    font-size: 2rem;
  }
}
</style>
