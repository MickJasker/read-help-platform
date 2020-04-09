<template>
  <div class="home">
    <Loader v-if="loading" />
    <h1>Welkom bij Leesgeest</h1>
    <Camera
      class="camera"
      @upload="handleUpload($event)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Camera from '@/components/molecules/Camera.vue';
import { ImageTextApi } from '@/data/Api';
import Loader from '@/components/Loader.vue';

@Component({
  components: {
    Camera,
    Loader,
  },
})
export default class Home extends Vue {
  loading = false;

  error: Error | null = null;

  handleUpload(file: File) {
    const imageTextApi = new ImageTextApi();

    this.loading = true;
    imageTextApi
      .transformImageToText(file)
      .then(() => {
        this.$router.push('/reader');
      })
      .catch((err) => {
        this.error = err;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color-accent);
    min-height: 100vh;
    position: relative;

    h1 {
      font-size: 6rem;
      text-align: center;
      color: white;
      opacity: 0.85;
    }

    .camera {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
