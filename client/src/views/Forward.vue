<template>
  <div class="forward-view">
    <ForwardForm />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ForwardForm from '@/components/organisms/ForwardForm.vue';

@Component({
  components: {
    ForwardForm,
  },
})

export default class Forward extends Vue {}

</script>


<style scoped lang="scss">
  .forward-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: #242582;
    height: 100vh;
    width: 100%;
  }
</style>
