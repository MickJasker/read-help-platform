<template>
  <div class="audio-player">
    <audio
      ref="audio"
      :src="`data:audio/mpeg;base64,${src}`"
      controls
      @ended="$emit('ended')"
    />
  </div>
</template>

<script lang=ts>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AudioPlayer extends Vue {
  @Prop(String)
  readonly src?: string;

  play() {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.play();
  }

  pause() {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.pause();
  }

  forward(amount: number) {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.currentTime += amount;
  }

  backward(amount: number) {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.currentTime -= amount;
  }
}
</script>

<style scoped lang="scss">
  .audio-player {
    display: none;
  }
</style>
