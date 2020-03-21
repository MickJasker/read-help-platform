<template>
  <form
    class="file-selector"
    @submit.prevent="upload"
  >
    <input
      id="file"
      ref="file"
      type="file"
      accept="image/*"
      @change="upload"
    >
    <label for="file">
      Maak een foto
    </label>
    <h1 v-if="error">
      {{ error }}
    </h1>
    <h1 v-if="response">
      {{ response }}
    </h1>
    <h2 v-if="status">
      {{ status }}
    </h2>
  </form>
</template>

<script lang=ts>
import { Vue, Component } from 'vue-property-decorator';
import 'firebase/storage';
import { ImageTextApi } from '@/data/Api';

enum Status {
  uploading = 'UPLOADING',
  error = 'ERROR',
  complete = 'COMPLETE'
}

@Component
export default class FileSelector extends Vue {
  error: Error | null = null;

  response: string | null = null;

  status: Status | null = null;

  upload() {
    // @ts-ignore
    const file: File = this.$refs.file.files[0];
    const imageTextApi = new ImageTextApi();

    this.response = null;
    this.status = Status.uploading;
    this.error = null;

    imageTextApi
      .transformImageToText(file)
      .then((text: string) => {
        this.status = Status.complete;
        this.response = text;
      })
      .catch((err) => {
        this.error = err;
        this.status = Status.error;
      });
  }
}
</script>

<style scoped lang="scss">
.file-selector {
  margin-top: 10rem;

  #file {
    display: none;
  }

  label {
    padding: 1rem 2rem;
    background: #000;
    color: white;
  }
}
</style>
