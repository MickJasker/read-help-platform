<template>
  <div class="loader">
    <div class="content">
      <h1>Even geduld</h1>
    </div>
  </div>
</template>

<script lang=ts>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>

<style scoped lang="scss">
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
    padding: 5rem;
    backdrop-filter: blur(1rem);
    background: rgba(#000, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      padding: 4rem;
      border-radius: 1rem;
      box-shadow: 0 2rem 3rem rgba(#000, 0.15), 0 0 3rem rgba(#000, 0.15);
      text-align: center;
      background: var(--color-light);
    }

    h1 {
      display: block;
      font-size: 4rem;
    }
  }
</style>
