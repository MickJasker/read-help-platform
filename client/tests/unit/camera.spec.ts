import Camera from '@/components/molecules/Camera.vue';
import { shallowMount } from '@vue/test-utils';
import '@/util/icons';

describe('Camera', () => {
  it('renders', () => {
    const camera = shallowMount(Camera);

    expect(camera.exists()).toBe(true);
  });
});
