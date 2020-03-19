<template>
  <div class="home">
    <Camera />
  </div>
</template>

<script>
// @ is an alias to /src
import Camera from '@/components/Camera.vue';

export default {
  name: 'Home',
  components: {
    Camera,
  },
};
</script>
