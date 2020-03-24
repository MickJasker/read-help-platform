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

    <audio
      v-if="audioResponse"
      ref="player"
      controls
      autoPlay
      :src="`data:audio/mpeg;base64,${audioResponse}`"
    />
  </form>
</template>

<script lang=ts>
import { Vue, Component } from 'vue-property-decorator';
import 'firebase/storage';
import { ImageTextApi, TextSpeechApi } from '@/data/Api';
import { ImageTextResponse } from '@/data/Api/ImageTextApi';

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

  audioResponse: string | null = null;

  upload() {
    // @ts-ignore
    const file: File = this.$refs.file.files[0];
    const imageTextApi = new ImageTextApi();

    this.response = null;
    this.status = Status.uploading;
    this.error = null;

    imageTextApi
      .transformImageToText(file)
      .then((data: ImageTextResponse) => {
        this.status = Status.complete;
        this.response = data.data.description;

        this.playText(data.data.locale);
      })
      .catch((err) => {
        this.error = err;
        this.status = Status.error;
      });
  }

  playText(locale?: string) {
    const textToSpeechApi = new TextSpeechApi();

    let defLocale = 'en-US';

    if (locale) {
      defLocale = `${locale}-${locale.toUpperCase()}`;

      if (locale === 'en') {
        defLocale = `${locale}-US`;
      }
    }

    if (this.response) {
      this.error = null;
      textToSpeechApi
        .transformTextToSpeech(this.response, defLocale)
        .then((response) => {
          this.audioResponse = response.audioContent;
        })
        .catch((err) => {
          this.error = err;
        });
    }
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
