<template>
  <section class="audio-controls">
    <div class="toolbar">
      <img src="@/assets/svg/backward.svg">
      <font-awesome-icon
        v-if="isPlaying"
        :icon="['fas', 'pause']"
        class="play-state"
        @click="togglePlayState"
      />
      <font-awesome-icon
        v-else
        :icon="['fas', 'play']"
        class="play-state"
        @click="togglePlayState"
      />
      <img src="@/assets/svg/forward.svg">
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'AudioControls',
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {
    togglePlayState() {
      if (this.isPlaying) {
        this.isPlaying = false;
      } else {
        this.isPlaying = true;
      }
    },
  },
};
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
    }
  }
}
</style>
