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
      <font-awesome-icon :icon="['fas', 'file-alt']" />
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
        const { description, locale } = data.data;
        this.response = description;

        return FileSelector.playText(description, locale);
      })
      .then((audioContent: string) => {
        this.status = Status.complete;
        this.audioResponse = audioContent;
      })
      .catch((err) => {
        this.error = err;
        this.status = Status.error;
      });
  }

  private static async playText(text: string, locale?: string) {
    const textToSpeechApi = new TextSpeechApi();

    let defLocale = 'en-US';

    if (locale) {
      defLocale = `${locale}-${locale.toUpperCase()}`;

      if (locale === 'en') {
        defLocale = `${locale}-US`;
      }
    }
    const response = await textToSpeechApi.transformTextToSpeech(text, defLocale);

    return response.audioContent;
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
