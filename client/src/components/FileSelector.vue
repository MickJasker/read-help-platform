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
import firebase from 'firebase/app';
import 'firebase/storage';
import axios, { AxiosResponse } from 'axios';


interface Vertex {
  x: number;
  y: number;
}

interface BoundingPoly {
  vertices: Vertex[];
  normalizedVertices: unknown[];
}

interface ImageTextData {
  locations: unknown[];
  properties: unknown[];
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly: BoundingPoly;
}

interface ImageTextResponse extends AxiosResponse {
  data: ImageTextData;
}

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

    const ref = firebase.storage().ref(`textImages/${file.name}`);

    this.error = null;
    this.response = null;
    this.status = Status.uploading;
    ref
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => axios.post('http://192.168.0.180:3000/image-text', {
        image: url,
      }))
      .then((response: ImageTextResponse) => {
        this.response = response.data.description;
        this.status = Status.complete;
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
