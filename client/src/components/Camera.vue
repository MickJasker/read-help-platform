<template>
  <div class="camera">
    <video class="video" />
    <div
      v-show="imgBitMap"
      class="capture-wrapper"
    >
      <button
        class="close"
        @click="closeCanvas"
      >
        close
      </button>
      <canvas class="capture" />
    </div>
    <p v-if="error">
      {{ error.message }}
    </p>
    <button
      v-else
      @click="stopCameras"
    >
      Kill
    </button>
    <button @click="captureScreenShot">
      Capture
    </button>
  </div>
</template>

<script lang=ts>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Camera extends Vue {
  private stream?: MediaStream;

  private canvas: HTMLCanvasElement | null = null;

  public imgBitMap: ImageBitmap | null = null;

  public error: Error | null = null;

  mounted() {
    this.setupStream()
      .catch((err) => {
        this.error = err;
      });
  }

  private async setupStream(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    this.stream = stream;
    const videoEl: HTMLVideoElement | null = this.$el.querySelector('video');

    if (videoEl) {
      videoEl.srcObject = stream;

      await videoEl.play();
    } else {
      throw new Error('No video element found');
    }
  }

  beforeDestroy() {
    this.stopCameras();
  }

  private drawCanvas(img: ImageBitmap) {
    if (!this.canvas) {
      throw new Error('No canvas found');
    }
    const { canvas } = this;

    canvas.width = Number(getComputedStyle(canvas).width.split('px')[0]);
    canvas.height = Number(getComputedStyle(canvas).height.split('px')[0]);

    const { width, height } = canvas;

    const ratio = Math.min(width / img.width, height / img.height);
    const x = (width - img.width * ratio) / 2;
    const y = (height - img.height * ratio) / 2;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Context is not defined');
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
  }

  public captureScreenShot() {
    const { stream } = this;

    if (stream) {
      const [track] = stream.getVideoTracks();
      const imageCapture = new ImageCapture(track);

      imageCapture.takePhoto()
        .then((blob: Blob) => createImageBitmap(blob))
        .then((imageBitmap: ImageBitmap) => {
          this.imgBitMap = imageBitmap;

          this.canvas = this.$el.querySelector('canvas.capture');

          if (!this.canvas) {
            throw new Error('No canvas found');
          }

          this.drawCanvas(imageBitmap);
        });
    }
  }

  public closeCanvas() {
    this.imgBitMap = null;
  }

  public stopCameras() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });

      this.$emit('streamStopped');
    }
  }
}
</script>

<style scoped lang="scss">
.camera {
  .capture-wrapper {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000aa;
    backdrop-filter: blur(1rem);

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }

  canvas.capture {
    min-width: 50vw;
    width: 500px;
    object-fit: contain;
    height: 100vh;
  }
}
</style>
