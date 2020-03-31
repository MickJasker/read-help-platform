<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { authController } from '@/data/User';

@Component
export default class App extends Vue {
  // eslint-disable-next-line class-methods-use-this
  mounted() {
    // eslint-disable-next-line no-console
    authController.signInWithTempAccount().catch((err) => console.error(err));
  }
}
</script>
