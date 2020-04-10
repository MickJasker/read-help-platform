<template>
  <div class="reader">
    <TextContainer>{{ text }}</TextContainer>
    <AudioPlayer
      v-if="audioSource"
      ref="audioPlayer"
      :src="audioSource"
      @ended="handleEnded"
    />
    <AudioControls
      ref="audioControls"
      :loading="loading"
      @play="handlePlay"
      @pause="handlePause"
      @forward="handleForward"
      @backward="handleBackward"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TextContainer from '@/components/organisms/TextContainer.vue';
import AudioControls from '@/components/organisms/AudioControls.vue';
import AudioPlayer from '@/components/atoms/AudioPlayer.vue';
import { ImageTextApi, TextSpeechApi } from '@/data/Api';

@Component({
  components: {
    TextContainer,
    AudioControls,
    AudioPlayer,
  },
})
export default class Reader extends Vue {
  text = '';

  audioSource: string | null = null;

  error: Error | null = null;

  loading = false;

  private locale = '';

  created() {
    ImageTextApi
      .getLatestTextConversion()
      .then(((value) => {
        this.text = value.description;

        this.locale = value.locale;
      }))
      .catch(() => {
        this.$router.push('/');
      });
  }

  async handlePlay() {
    if (!this.audioSource) {
      await this.loadAudioSource();
    }

    await this.$nextTick();

    const { audioPlayer } = this.$refs;

    // @ts-ignore
    audioPlayer.play();
  }

  handlePause() {
    const { audioPlayer } = this.$refs;

    // @ts-ignore
    audioPlayer.pause();
  }

  handleEnded() {
    const { audioControls } = this.$refs;

    // @ts-ignore
    audioControls.handleEnded();
  }

  private loadAudioSource() {
    const textToSpeech = new TextSpeechApi();
    this.loading = true;
    return textToSpeech
      .transformTextToSpeech(this.text, this.locale)
      .then((response) => {
        this.audioSource = response.audioContent;

        this.loading = false;
        return response.audioContent;
      })
      .catch((err) => {
        this.error = err;
      });
  }

  handleForward() {
    const { audioPlayer } = this.$refs;

    // @ts-ignore
    audioPlayer.forward(5);
  }

  handleBackward() {
    const { audioPlayer } = this.$refs;

    // @ts-ignore
    audioPlayer.backward(5);
  }
}
</script>


<style scoped lang="scss">

</style>
