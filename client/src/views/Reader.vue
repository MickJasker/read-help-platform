<template>
  <div class="reader">
    <TextContainer />
    <AudioControls />
  </div>
</template>

<script>
// @ is an alias to /src
import TextContainer from '@/components/organisms/TextContainer.vue';
import AudioControls from '@/components/organisms/AudioControls.vue';

export default {
  name: 'Reader',
  components: {
    TextContainer,
    AudioControls,
  },
};
</script>


<style scoped lang="scss">

</style>
