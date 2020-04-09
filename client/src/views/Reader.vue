<template>
  <div class="reader">
    <TextContainer>{{ text }}</TextContainer>
    <AudioControls />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TextContainer from '@/components/organisms/TextContainer.vue';
import AudioControls from '@/components/organisms/AudioControls.vue';
import { ImageTextApi } from '@/data/Api';

@Component({
  components: {
    TextContainer,
    AudioControls,
  },
})
export default class Reader extends Vue {
  text = '';

  created() {
    ImageTextApi
      .getLatestTextConversion()
      .then(((value) => {
        this.text = value.description;
      }))
      .catch(() => {
        this.$router.push('/');
      });
  }
}
</script>


<style scoped lang="scss">

</style>
