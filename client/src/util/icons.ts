import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileAlt } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(faFileAlt);
