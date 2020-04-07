import Camera from '@/components/Camera.vue';
import { shallowMount } from '@vue/test-utils';
import '@/util/Icons';

describe('Camera', () => {
  it('renders', () => {
    const camera = shallowMount(Camera);

    expect(camera.exists()).toBe(true);
  });
});
