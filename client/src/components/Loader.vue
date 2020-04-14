<template>
  <div class="loader">
    <div class="content">
      <svg
        viewBox="-30 -30 200 200"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Mobile"
            transform="translate(-87.000000, -421.000000)"
            fill="#FFFFFF"
            fill-rule="nonzero"
          >
            <g
              id="Loading"
              transform="translate(87.000000, 421.000000)"
            >
              <path
                id="spinner"
                d="M72.9998212,145.406211 C91.7280328,145.406211 108.801147,138.320332
                121.684588,126.683149 C123.182616,125.330175 123.253283,123.00331 121.825922,
                121.575949 L119.754833,119.50486 C118.435618,118.185645 116.312744,118.123847
                114.926296,119.371822 C103.825267,129.362777 89.1322328,135.445297
                72.9998212,135.445297 C38.5045497,135.445297 10.3046582,107.516344
                10.3046582,72.7501341 C10.3046582,38.2548627 38.2336115,10.0549711
                72.9998212,10.0549711 C97.2758291,10.0549711 118.332908,23.8470715
                128.748437,44.0392651 L95.2653931,44.0392651 C93.3239076,44.0392651
                91.7497765,45.6133961 91.7497765,47.5548817 L91.7497765,50.4845622
                C91.7497765,52.4260477 93.3239076,54.0001788 95.2653931,54.0001788
                L142.140281,54.0001788 C144.081767,54.0001788 145.655898,52.4260477
                145.655898,50.4845622 L145.655898,3.60967395 C145.655898,1.66818841
                144.081767,0.0939807028 142.140281,0.0939807028 L139.210601,0.0939807028
                C137.269115,0.0939807028 135.694984,1.66818841 135.694984,3.60967395
                L135.694984,36.0192647 C123.039852,14.4632247 99.589819,0.0105156655
                72.7675067,0.0939807028 C32.8105554,0.219369843 0.28137426,32.909054
                0.343654872,72.8662914 C0.406400665,112.939686 32.9118354,145.406211
                72.9998212,145.406211 Z"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { gsap } from 'gsap';

@Component
export default class Loader extends Vue {
  // eslint-disable-next-line class-methods-use-this
  mounted() {
    gsap.to('#spinner', {
      rotation: 360, duration: 1, transformOrigin: 'center',
    }).repeat(-1);
  }
}


</script>

<style scoped lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 100;
  padding: 5rem;
  background: #f54f74;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 100px;
    height: 100px;
  }
}
</style>
