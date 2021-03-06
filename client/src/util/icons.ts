import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFileAlt,
  faPause,
  faPlay,
  faUndo,
  faSpinnerThird,
  faPaperPlane,
} from '@fortawesome/pro-solid-svg-icons';
import { faCamera } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(
  faFileAlt,
  faPause,
  faPlay,
  faCamera,
  faUndo,
  faSpinnerThird,
  faPaperPlane,
);
