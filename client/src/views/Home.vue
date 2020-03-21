<template>
  <div class="home">
    <FileSelector />
  </div>
</template>

<script>
// @ is an alias to /src
import FileSelector from '@/components/FileSelector.vue';

export default {
  name: 'Home',
  components: {
    FileSelector,
  },
};
</script>
