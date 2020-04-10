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
import { analytics } from '@/util/firebase';

@Component
export default class AudioPlayer extends Vue {
  @Prop(String)
  readonly src?: string;

  play() {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.play();
  }

  async mounted() {
    await this.$nextTick();

    const audioElement = this.$refs.audio as HTMLAudioElement;
    analytics.logEvent('playAudio', {
      duration: audioElement.duration,
    });
  }

  pause() {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.pause();
  }

  /**
   * Skips the audio player to `amount` of secconds ahead
   */
  forward(amount: number) {
    const audioElement = this.$refs.audio as HTMLAudioElement;

    audioElement.currentTime += amount;
  }


  /**
   * Reverts the audio player to `amount` of secconds backwards
   */
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
