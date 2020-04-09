<template>
  <div class="camera">
    <form @submit.prevent="handleFileSelection">
      <label>
        <font-awesome-icon
          class="icon"
          :icon="['fal', 'camera']"
        /> Maak een foto
        <input
          ref="file"
          type="file"
          class="input"
          accept="image/*"
          @change="handleFileSelection"
        >
      </label>
    </form>
  </div>
</template>

<script lang=ts>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Camera extends Vue {
  handleFileSelection() {
    // @ts-ignore
    const file: File = this.$refs.file.files[0];

    this.$emit('upload', file);
  }
}
</script>

<style scoped lang="scss">
  .camera {
    label {
      font-size: 3rem;
      padding: 10rem 1rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-primary);
      color: var(--color-light);
      font-weight: 500;

      .icon {
        margin-right: 2rem;
        font-size: 5rem;
      }

      .input {
        display: none;
      }
    }
  }
</style>
