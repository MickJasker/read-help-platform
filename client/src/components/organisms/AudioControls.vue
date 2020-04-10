<template>
  <section class="audio-controls">
    <div class="toolbar">
      <img
        src="@/assets/svg/backward.svg"
        alt="backwards"
        @click="$emit('backward')"
      >
      <template v-if="loading">
        <font-awesome-icon
          :icon="['fas', 'spinner-third']"
          class="play-state loading spinner"
        />
      </template>
      <template v-else>
        <font-awesome-icon
          v-if="playStatus === 'playing'"
          :icon="['fas', 'pause']"
          class="play-state"
          @click="togglePlayState"
        />
        <font-awesome-icon
          v-else-if="playStatus === 'paused'"
          :icon="['fas', 'play']"
          class="play-state"
          @click="togglePlayState"
        />
        <font-awesome-icon
          v-else-if="playStatus === 'ended'"
          :icon="['fas', 'undo']"
          class="play-state"
          @click="togglePlayState"
        />
      </template>
      <img
        src="@/assets/svg/forward.svg"
        alt="forwards"
        @click="$emit('forward')"
      >
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

enum PlayStatus {
  playing = 'playing',
  paused = 'paused',
  ended = 'ended',
}

@Component
export default class AudioPlayer extends Vue {
  playStatus: PlayStatus = PlayStatus.paused;

  @Prop(Boolean)
  readonly loading?: boolean;

  togglePlayState() {
    if (this.playStatus === PlayStatus.playing) {
      this.playStatus = PlayStatus.paused;

      this.$emit('pause');
    } else {
      this.playStatus = PlayStatus.playing;

      this.$emit('play');
    }
  }

  handleEnded() {
    this.playStatus = PlayStatus.ended;
  }
}
</script>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: center;
  .toolbar {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    width: 70%;
    .play-state {
      font-size: 5rem;

      &.spinner {
        animation: spin 1s ease infinite;

        @keyframes spin {
          from {
            transform: rotate(0deg);
          } to {
              transform: rotate(360deg);
            }
        }
      }
    }
  }
}
</style>
