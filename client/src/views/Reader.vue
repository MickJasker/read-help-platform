<template>
  <div class="reader">
    <HelpButton @help="askForHelp" />
    <TextContainer>{{ text }}</TextContainer>
    <AudioPlayer
      v-if="audioSource"
      ref="audioPlayer"
      :src="audioSource"
      @ended="handleEnded"
    />
    <p v-if="error">
      {{ error }}
    </p>
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
import HelpButton from '@/components/organisms/HelpButton.vue';
import AudioPlayer from '@/components/atoms/AudioPlayer.vue';
import { ImageTextApi, TextSpeechApi } from '@/data/Api';
import { performance, analytics } from '@/util/firebase';
import Share from '@/data/Share';

@Component({
  components: {
    TextContainer,
    AudioControls,
    HelpButton,
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
      const performanceTrace = performance.trace('loadAudioBinary');

      performanceTrace.start();
      await this.loadAudioSource();
      performanceTrace.stop();
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
    const audioControls = this.$refs.audioControls as AudioControls;

    audioControls.handleEnded();
  }

  private loadAudioSource() {
    const textToSpeech = new TextSpeechApi();
    this.loading = true;
    const { text, locale } = this;

    analytics.logEvent('transformTextToSpeech', { locale });

    return textToSpeech
      .transformTextToSpeech(text, locale)
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
    const audioPlayer = this.$refs.audioPlayer as AudioPlayer;

    audioPlayer.forward(5);
  }

  handleBackward() {
    const audioPlayer = this.$refs.audioPlayer as AudioPlayer;

    audioPlayer.backward(5);
  }

  askForHelp() {
    Share
      .share({
        text: this.text,
      })
      .catch((err) => {
        this.error = err;
      });
  }
}
</script>


<style scoped lang="scss">

</style>
